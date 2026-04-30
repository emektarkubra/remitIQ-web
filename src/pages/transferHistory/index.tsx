import { useState } from "react"
import { useTranslation } from "react-i18next"
import {
    Badge, Button, Card, DatePicker, Flex,
    Input, Select, Table, Tag, Typography
} from "antd"
import { TbArrowDown, TbArrowUp, TbDownload, TbFilter, TbSearch } from "react-icons/tb"
import withLayout from "../../layout/withLayout"
import "./index.scss"

const { Text, Title } = Typography
const { RangePicker } = DatePicker

// ── Types ──────────────────────────────────────────────────────────────────

interface Transfer {
    id: string
    date: string
    recipient: string
    flag: string
    channel: string
    from: string
    fromAmount: number
    fromCurrency: string
    toAmount: number
    toCurrency: string
    rate: number
    fee: string
    savings: string | null
    status: "completed" | "processing" | "pending" | "failed"
}

// ── Mock Data ──────────────────────────────────────────────────────────────

const TRANSFERS: Transfer[] = [
    { id: "1", date: "30 Haz 2025", recipient: "Ayşe E. (Anne)", flag: "🇹🇷", channel: "Wise", from: "USD", fromAmount: 500, fromCurrency: "$", toAmount: 16960, toCurrency: "₺", rate: 33.92, fee: "$4.20", savings: "+$14", status: "completed" },
    { id: "2", date: "28 Haz 2025", recipient: "Mehmet K.", flag: "🇩🇪", channel: "Remitly", from: "EUR", fromAmount: 200, fromCurrency: "€", toAmount: 7368, toCurrency: "₺", rate: 36.84, fee: "$2.99", savings: "+$6", status: "processing" },
    { id: "3", date: "25 Haz 2025", recipient: "Fatma Y.", flag: "🇬🇧", channel: "Wise", from: "GBP", fromAmount: 150, fromCurrency: "£", toAmount: 6468, toCurrency: "₺", rate: 43.12, fee: "$3.50", savings: "+$9", status: "completed" },
    { id: "4", date: "20 Haz 2025", recipient: "Mehmet E. (Kardeş)", flag: "🇹🇷", channel: "WU", from: "USD", fromAmount: 250, fromCurrency: "$", toAmount: 8230, toCurrency: "₺", rate: 32.92, fee: "$9.90", savings: null, status: "completed" },
    { id: "5", date: "15 Haz 2025", recipient: "Ayşe E. (Anne)", flag: "🇹🇷", channel: "Wise", from: "USD", fromAmount: 400, fromCurrency: "$", toAmount: 13440, toCurrency: "₺", rate: 33.60, fee: "$4.20", savings: "+$11", status: "completed" },
    { id: "6", date: "10 Haz 2025", recipient: "Mehmet K.", flag: "🇩🇪", channel: "Remitly", from: "EUR", fromAmount: 300, fromCurrency: "€", toAmount: 10980, toCurrency: "₺", rate: 36.60, fee: "$2.99", savings: "+$8", status: "completed" },
    { id: "7", date: "5 Haz 2025", recipient: "Fatma Y.", flag: "🇬🇧", channel: "Wise", from: "GBP", fromAmount: 200, fromCurrency: "£", toAmount: 8500, toCurrency: "₺", rate: 42.50, fee: "$3.50", savings: "+$7", status: "failed" },
    { id: "8", date: "1 Haz 2025", recipient: "Ayşe E. (Anne)", flag: "🇹🇷", channel: "Wise", from: "USD", fromAmount: 500, fromCurrency: "$", toAmount: 16750, toCurrency: "₺", rate: 33.50, fee: "$4.20", savings: "+$10", status: "completed" },
    { id: "9", date: "25 May 2025", recipient: "Mehmet E. (Kardeş)", flag: "🇹🇷", channel: "Remitly", from: "USD", fromAmount: 300, fromCurrency: "$", toAmount: 9960, toCurrency: "₺", rate: 33.20, fee: "$2.99", savings: "+$5", status: "completed" },
    { id: "10", date: "20 May 2025", recipient: "Mehmet K.", flag: "🇩🇪", channel: "WU", from: "EUR", fromAmount: 150, fromCurrency: "€", toAmount: 5400, toCurrency: "₺", rate: 36.00, fee: "$9.90", savings: null, status: "pending" },
]

const STATUS_MAP: Record<Transfer["status"], { color: string; label: string }> = {
    completed: { color: "success", label: "Tamamlandı" },
    processing: { color: "processing", label: "İşlemde" },
    pending: { color: "warning", label: "Bekliyor" },
    failed: { color: "error", label: "Başarısız" },
}

const CHANNEL_OPTIONS = [
    { value: "all", label: "Tüm Kanallar" },
    { value: "Wise", label: "Wise" },
    { value: "Remitly", label: "Remitly" },
    { value: "WU", label: "Western Union" },
]

const STATUS_OPTIONS = [
    { value: "all", label: "Tüm Durumlar" },
    { value: "completed", label: "Tamamlandı" },
    { value: "processing", label: "İşlemde" },
    { value: "pending", label: "Bekliyor" },
    { value: "failed", label: "Başarısız" },
]

// ── Page ───────────────────────────────────────────────────────────────────

const History = () => {
    const { t } = useTranslation()

    const [search, setSearch] = useState("")
    const [channelFilter, setChannelFilter] = useState("all")
    const [statusFilter, setStatusFilter] = useState("all")
    const [showFilters, setShowFilters] = useState(false)

    const filtered = TRANSFERS.filter(tr => {
        const matchSearch = tr.recipient.toLowerCase().includes(search.toLowerCase()) ||
            tr.channel.toLowerCase().includes(search.toLowerCase())
        const matchChannel = channelFilter === "all" || tr.channel === channelFilter
        const matchStatus = statusFilter === "all" || tr.status === statusFilter
        return matchSearch && matchChannel && matchStatus
    })

    const totalSent = TRANSFERS.filter(t => t.status === "completed").reduce((a, t) => a + t.fromAmount, 0)
    const totalSavings = TRANSFERS.filter(t => t.savings).length * 9
    const completed = TRANSFERS.filter(t => t.status === "completed").length

    const columns = [
        {
            title: t("history.date"),
            dataIndex: "date",
            key: "date",
            render: (text: string) => (
                <Text className="history__table-date">{text}</Text>
            ),
        },
        {
            title: t("history.recipient"),
            dataIndex: "recipient",
            key: "recipient",
            render: (text: string, record: Transfer) => (
                <Flex align="center" gap={8}>
                    <span className="history__table-flag">{record.flag}</span>
                    <Text strong className="history__table-recipient">{text}</Text>
                </Flex>
            ),
        },
        {
            title: t("history.channel"),
            dataIndex: "channel",
            key: "channel",
            render: (text: string) => (
                <Tag className="history__channel-tag">{text}</Tag>
            ),
        },
        {
            title: t("history.sent"),
            key: "sent",
            render: (_: any, record: Transfer) => (
                <Text strong className="history__table-amount">
                    {record.fromCurrency}{record.fromAmount.toLocaleString()}
                </Text>
            ),
        },
        {
            title: t("history.received"),
            key: "received",
            render: (_: any, record: Transfer) => (
                <Text className="history__table-received">
                    {record.toCurrency}{record.toAmount.toLocaleString()}
                </Text>
            ),
        },
        {
            title: t("history.rate"),
            key: "rate",
            responsive: ["md"] as any,
            render: (_: any, record: Transfer) => (
                <Text className="history__table-rate">{record.rate.toFixed(2)}</Text>
            ),
        },
        {
            title: t("history.fee"),
            dataIndex: "fee",
            key: "fee",
            responsive: ["md"] as any,
            render: (text: string) => (
                <Text className="history__table-fee">{text}</Text>
            ),
        },
        {
            title: t("history.savings"),
            dataIndex: "savings",
            key: "savings",
            responsive: ["lg"] as any,
            render: (text: string | null) => (
                text
                    ? <Text strong className="history__table-savings">{text}</Text>
                    : <Text className="history__table-no-savings">—</Text>
            ),
        },
        {
            title: t("history.status"),
            dataIndex: "status",
            key: "status",
            render: (status: Transfer["status"]) => (
                <Badge
                    status={STATUS_MAP[status].color as any}
                    text={<Text style={{ fontSize: 12 }}>{STATUS_MAP[status].label}</Text>}
                />
            ),
        },
    ]

    return (
        <div className="history-page">
            <div className="history">

                {/* Header */}
                <Flex justify="space-between" align="center" className="history__header" wrap="wrap">
                    <div>
                        <Title level={4} className="history__title">{t("history.title")}</Title>
                        <Text className="history__subtitle">{TRANSFERS.length} {t("history.totalTransfers")}</Text>
                    </div>
                    <Button icon={<TbDownload size={15} />} className="history__export-btn">
                        {t("history.export")}
                    </Button>
                </Flex>

                {/* Stats */}
                <div className="history__stats">
                    <Card className="history__stat-card">
                        <Text className="history__stat-label">{t("history.totalSent")}</Text>
                        <Flex align="center" gap={6}>
                            <TbArrowUp size={14} className="history__stat-icon history__stat-icon--up" />
                            <Text strong className="history__stat-value">${totalSent.toLocaleString()}</Text>
                        </Flex>
                    </Card>
                    <Card className="history__stat-card">
                        <Text className="history__stat-label">{t("history.totalSavings")}</Text>
                        <Flex align="center" gap={6}>
                            <TbArrowDown size={14} className="history__stat-icon history__stat-icon--green" />
                            <Text strong className="history__stat-value history__stat-value--green">${totalSavings}</Text>
                        </Flex>
                    </Card>
                    <Card className="history__stat-card">
                        <Text className="history__stat-label">{t("history.completedCount")}</Text>
                        <Text strong className="history__stat-value">{completed}</Text>
                    </Card>
                    <Card className="history__stat-card">
                        <Text className="history__stat-label">{t("history.avgAmount")}</Text>
                        <Text strong className="history__stat-value">
                            ${Math.round(totalSent / completed).toLocaleString()}
                        </Text>
                    </Card>
                </div>

                {/* Filters */}
                <Card className="history__filter-card">
                    <Flex gap={10} align="center" wrap="wrap">
                        <Input
                            prefix={<TbSearch size={14} className="history__search-icon" />}
                            placeholder={t("history.searchPlaceholder")}
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            allowClear
                            className="history__search"
                        />
                        <Button
                            icon={<TbFilter size={14} />}
                            onClick={() => setShowFilters(f => !f)}
                            className={showFilters ? "history__filter-btn--active" : ""}
                        >
                            {t("history.filters")}
                        </Button>
                        <RangePicker className="history__date-picker" />
                    </Flex>

                    {showFilters && (
                        <Flex gap={10} className="history__filter-row" wrap="wrap">
                            <Select
                                value={channelFilter}
                                onChange={setChannelFilter}
                                options={CHANNEL_OPTIONS}
                                className="history__filter-select"
                            />
                            <Select
                                value={statusFilter}
                                onChange={setStatusFilter}
                                options={STATUS_OPTIONS}
                                className="history__filter-select"
                            />
                            <Button
                                type="link"
                                onClick={() => { setSearch(""); setChannelFilter("all"); setStatusFilter("all") }}
                                className="history__clear-btn"
                            >
                                {t("history.clearFilters")}
                            </Button>
                        </Flex>
                    )}
                </Card>

                {/* Table */}
                <Card className="history__table-card">
                    <Flex justify="space-between" align="center" className="history__table-header">
                        <Text className="history__table-count">
                            {filtered.length} {t("history.results")}
                        </Text>
                    </Flex>
                    <Table
                        dataSource={filtered}
                        columns={columns}
                        rowKey="id"
                        className="history__table"
                        size="small"
                        pagination={{
                            pageSize: 7,
                            showSizeChanger: false,
                            showTotal: (total) => `${total} ${t("history.totalTransfers")}`,
                        }}
                        scroll={{ x: 600 }}
                    />
                </Card>

            </div>
        </div>
    )
}

export default withLayout(<History />)