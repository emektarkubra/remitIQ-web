import { useState } from "react"
import { useTranslation } from "react-i18next"
import {
    Button, Card, Drawer, Empty, Flex, Form,
    Input, Select, Tag, Typography
} from "antd"
import { TbEdit, TbSearch, TbSend, TbTrash, TbUser, TbUserPlus } from "react-icons/tb"
import withLayout from "../../layout/withLayout"
import "./index.scss"

const { Text, Title } = Typography

// ── Types ──────────────────────────────────────────────────────────────────

interface Recipient {
    id: string
    name: string
    bank: string
    iban: string
    flag: string
    country: string
    relation: string
    color: string
    totalSent: string
    lastSent: string
}

// ── Mock Data ──────────────────────────────────────────────────────────────

const AVATAR_COLORS = ["#1b4fd8", "#0ea371", "#d97706", "#7c3aed", "#e5484d", "#0891b2"]

const INITIAL_RECIPIENTS: Recipient[] = [
    { id: "1", name: "Ayşe E. (Anne)", bank: "Ziraat Bankası", iban: "TR94 0001 0009 ****", flag: "🇹🇷", country: "Türkiye", relation: "Anne", color: "#1b4fd8", totalSent: "$4,200", lastSent: "3 gün önce" },
    { id: "2", name: "Mehmet K.", bank: "Deutsche Bank", iban: "DE89 3704 ****", flag: "🇩🇪", country: "Almanya", relation: "İş Ortağı", color: "#0ea371", totalSent: "$2,100", lastSent: "1 hafta önce" },
    { id: "3", name: "Fatma Y.", bank: "Barclays", iban: "GB29 NWBK ****", flag: "🇬🇧", country: "İngiltere", relation: "Kardeş", color: "#d97706", totalSent: "$1,260", lastSent: "12 gün önce" },
    { id: "4", name: "Mehmet E. (Kardeş)", bank: "İş Bankası", iban: "TR33 0006 ****", flag: "🇹🇷", country: "Türkiye", relation: "Kardeş", color: "#7c3aed", totalSent: "$860", lastSent: "20 gün önce" },
]

const COUNTRY_OPTIONS = [
    { value: "🇹🇷 Türkiye", label: "🇹🇷 Türkiye" },
    { value: "🇩🇪 Almanya", label: "🇩🇪 Almanya" },
    { value: "🇬🇧 İngiltere", label: "🇬🇧 İngiltere" },
    { value: "🇺🇸 ABD", label: "🇺🇸 ABD" },
    { value: "🇳🇴 Norveç", label: "🇳🇴 Norveç" },
    { value: "🇫🇷 Fransa", label: "🇫🇷 Fransa" },
    { value: "🇳🇱 Hollanda", label: "🇳🇱 Hollanda" },
]

const RELATION_OPTIONS = [
    { value: "Anne", label: "Anne" },
    { value: "Baba", label: "Baba" },
    { value: "Kardeş", label: "Kardeş" },
    { value: "Eş", label: "Eş" },
    { value: "İş Ortağı", label: "İş Ortağı" },
    { value: "Arkadaş", label: "Arkadaş" },
    { value: "Diğer", label: "Diğer" },
]

// ── Page ───────────────────────────────────────────────────────────────────

const Recipients = () => {
    const { t } = useTranslation()
    const [form] = Form.useForm()

    const [recipients, setRecipients] = useState<Recipient[]>(INITIAL_RECIPIENTS)
    const [search, setSearch] = useState("")
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [editTarget, setEditTarget] = useState<Recipient | null>(null)

    const filtered = recipients.filter(r =>
        r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.country.toLowerCase().includes(search.toLowerCase()) ||
        r.relation.toLowerCase().includes(search.toLowerCase())
    )

    const openAddDrawer = () => {
        setEditTarget(null)
        form.resetFields()
        setDrawerOpen(true)
    }

    const openEditDrawer = (r: Recipient) => {
        setEditTarget(r)
        form.setFieldsValue({
            name: r.name,
            country: `${r.flag} ${r.country}`,
            relation: r.relation,
            bank: r.bank,
            iban: r.iban,
        })
        setDrawerOpen(true)
    }

    const handleDelete = (id: string) => {
        setRecipients(prev => prev.filter(r => r.id !== id))
    }

    const handleSave = () => {
        form.validateFields().then(values => {
            const countryParts = values.country.split(" ")
            const flag = countryParts[0]
            const country = countryParts.slice(1).join(" ")

            if (editTarget) {
                setRecipients(prev => prev.map(r =>
                    r.id === editTarget.id
                        ? { ...r, name: values.name, bank: values.bank, iban: values.iban, flag, country, relation: values.relation }
                        : r
                ))
            } else {
                const color = AVATAR_COLORS[recipients.length % AVATAR_COLORS.length]
                setRecipients(prev => [...prev, {
                    id: String(Date.now()),
                    name: values.name,
                    bank: values.bank,
                    iban: values.iban,
                    flag,
                    country,
                    relation: values.relation,
                    color,
                    totalSent: "$0",
                    lastSent: "-",
                }])
            }

            setDrawerOpen(false)
            form.resetFields()
        })
    }

    return (
        <div className="recipients-page">

            {/* Header */}
            <Flex justify="space-between" align="center" className="recipients__header">
                <div>
                    <Title level={4} className="recipients__title">{t("recipients.title")}</Title>
                    <Text className="recipients__subtitle">
                        {recipients.length} {t("recipients.count")}
                    </Text>
                </div>
                <Button
                    type="primary"
                    icon={<TbUserPlus size={15} />}
                    onClick={openAddDrawer}
                >
                    {t("recipients.addNew")}
                </Button>
            </Flex>

            {/* Search */}
            <div className="recipients__search-wrapper">
                <Input
                    prefix={<TbSearch size={15} className="recipients__search-icon" />}
                    placeholder={t("recipients.searchPlaceholder")}
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    className="recipients__search"
                    allowClear
                />
            </div>

            {/* Grid */}
            {filtered.length === 0 ? (
                <Card className="recipients__empty-card">
                    <Empty
                        image={<TbUser size={48} className="recipients__empty-icon" />}
                        description={
                            <Text className="recipients__empty-text">
                                {search ? t("recipients.noResults") : t("recipients.empty")}
                            </Text>
                        }
                    >
                        {!search && (
                            <Button type="primary" onClick={openAddDrawer}>
                                {t("recipients.addFirst")}
                            </Button>
                        )}
                    </Empty>
                </Card>
            ) : (
                <div className="recipients__grid">
                    {filtered.map(r => (
                        <Card key={r.id} className="recipients__card">
                            <div className="recipients__card-top">
                                <div
                                    className="recipients__avatar"
                                    style={{ background: `linear-gradient(135deg, ${r.color}, ${r.color}99)` }}
                                >
                                    {r.name.charAt(0)}
                                </div>
                                <div className="recipients__card-actions">
                                    <Button
                                        type="text"
                                        size="small"
                                        icon={<TbEdit size={15} />}
                                        className="recipients__action-btn"
                                        onClick={() => openEditDrawer(r)}
                                    />
                                    <Button
                                        type="text"
                                        size="small"
                                        danger
                                        icon={<TbTrash size={15} />}
                                        className="recipients__action-btn recipients__action-btn--danger"
                                        onClick={() => handleDelete(r.id)}
                                    />
                                </div>
                            </div>

                            <Text strong className="recipients__name">{r.name}</Text>
                            <Tag className="recipients__relation-tag">{r.flag} {r.country} · {r.relation}</Tag>

                            <div className="recipients__bank-info">
                                <TbBuildingBank size={13} className="recipients__bank-icon" />
                                <Text className="recipients__bank">{r.bank}</Text>
                            </div>
                            <Text className="recipients__iban">{r.iban}</Text>

                            <div className="recipients__stats">
                                <div className="recipients__stat">
                                    <Text className="recipients__stat-label">{t("recipients.totalSent")}</Text>
                                    <Text strong className="recipients__stat-value">{r.totalSent}</Text>
                                </div>
                                <div className="recipients__stat">
                                    <Text className="recipients__stat-label">{t("recipients.lastSent")}</Text>
                                    <Text strong className="recipients__stat-value">{r.lastSent}</Text>
                                </div>
                            </div>

                            <Button
                                type="primary"
                                block
                                icon={<TbSend size={14} />}
                                className="recipients__send-btn"
                            >
                                {t("recipients.sendMoney")}
                            </Button>
                        </Card>
                    ))}
                </div>
            )}

            {/* Drawer */}
            <Drawer
                title={
                    <Flex align="center" gap={8}>
                        <TbUserPlus size={18} />
                        <span>{editTarget ? t("recipients.editRecipient") : t("recipients.addRecipient")}</span>
                    </Flex>
                }
                placement="right"
                width={420}
                open={drawerOpen}
                onClose={() => { setDrawerOpen(false); form.resetFields() }}
                footer={
                    <Flex gap={10}>
                        <Button block onClick={() => { setDrawerOpen(false); form.resetFields() }}>
                            {t("recipients.cancel")}
                        </Button>
                        <Button type="primary" block onClick={handleSave}>
                            {editTarget ? t("recipients.saveChanges") : t("recipients.saveRecipient")}
                        </Button>
                    </Flex>
                }
            >
                <Form form={form} layout="vertical" requiredMark={false}>
                    <Form.Item
                        name="name"
                        label={t("recipients.fullName")}
                        rules={[{ required: true, message: t("recipients.required") }]}
                    >
                        <Input placeholder="Ayşe Emektar" />
                    </Form.Item>

                    <Form.Item
                        name="country"
                        label={t("recipients.country")}
                        rules={[{ required: true, message: t("recipients.required") }]}
                    >
                        <Select placeholder={t("recipients.selectCountry")} options={COUNTRY_OPTIONS} />
                    </Form.Item>

                    <Form.Item
                        name="relation"
                        label={t("recipients.relation")}
                        rules={[{ required: true, message: t("recipients.required") }]}
                    >
                        <Select placeholder={t("recipients.selectRelation")} options={RELATION_OPTIONS} />
                    </Form.Item>

                    <Form.Item
                        name="bank"
                        label={t("recipients.bankName")}
                        rules={[{ required: true, message: t("recipients.required") }]}
                    >
                        <Input placeholder="Ziraat Bankası" />
                    </Form.Item>

                    <Form.Item
                        name="iban"
                        label={t("recipients.ibanLabel")}
                        rules={[{ required: true, message: t("recipients.required") }]}
                    >
                        <Input placeholder="TR94 0001 0009 **** **** **" />
                    </Form.Item>
                </Form>
            </Drawer>

        </div>
    )
}

// TbBuildingBank import eksik, ekle
function TbBuildingBank({ size, className }: { size: number; className?: string }) {
    return <TbUser size={size} className={className} />
}

export default withLayout(<Recipients />)