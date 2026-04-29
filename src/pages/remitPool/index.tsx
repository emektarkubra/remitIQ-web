import { useState } from "react"
import { useTranslation } from "react-i18next"
import {
    Alert, Badge, Button, Card, Flex, Progress,
    Table, Tag, Typography
} from "antd"
import { TbArrowRight, TbPool, TbSparkles, TbUsers } from "react-icons/tb"
import withLayout from "../../layout/withLayout"
import "./index.scss"

const { Text, Title } = Typography

// ── Types ──────────────────────────────────────────────────────────────────

interface Pool {
    id: string
    from: string
    fromFlag: string
    to: string
    toFlag: string
    collected: number
    target: number
    currency: string
    members: number
    closesIn: string
    myContribution: number | null
    commission: string
    savings: string
}

interface MyPool {
    id: string
    corridor: string
    contribution: string
    total: string
    savings: string
    status: "completed" | "processing"
    date: string
}

// ── Mock Data ──────────────────────────────────────────────────────────────

const ACTIVE_POOLS: Pool[] = [
    {
        id: "1",
        from: "USD", fromFlag: "🇺🇸",
        to: "TRY", toFlag: "🇹🇷",
        collected: 4200, target: 5000, currency: "$",
        members: 8, closesIn: "2s",
        myContribution: 500,
        commission: "0.8%", savings: "$12",
    },
    {
        id: "2",
        from: "EUR", fromFlag: "🇪🇺",
        to: "TRY", toFlag: "🇹🇷",
        collected: 1800, target: 4000, currency: "€",
        members: 5, closesIn: "6s",
        myContribution: null,
        commission: "0.9%", savings: "€8",
    },
    {
        id: "3",
        from: "GBP", fromFlag: "🇬🇧",
        to: "TRY", toFlag: "🇹🇷",
        collected: 900, target: 3000, currency: "£",
        members: 3, closesIn: "12s",
        myContribution: null,
        commission: "1.0%", savings: "£5",
    },
]

const MY_POOLS: MyPool[] = [
    { id: "1", corridor: "🇺🇸 USD → 🇹🇷 TRY", contribution: "$500", total: "$3,200", savings: "+$14", status: "completed", date: "30 Haz" },
    { id: "2", corridor: "🇺🇸 USD → 🇩🇪 EUR", contribution: "$300", total: "$2,100", savings: "+$9", status: "completed", date: "22 Haz" },
    { id: "3", corridor: "🇺🇸 USD → 🇹🇷 TRY", contribution: "$400", total: "$4,200", savings: "+$12", status: "processing", date: "Bugün" },
]

const STATUS_MAP = {
    completed: { color: "success", label: "Tamamlandı" },
    processing: { color: "processing", label: "İşlemde" },
}

// ── Page ───────────────────────────────────────────────────────────────────

const RemitPool = () => {
    const { t } = useTranslation()
    const [joining, setJoining] = useState<string | null>(null)

    const handleJoin = (poolId: string) => {
        setJoining(poolId)
        setTimeout(() => setJoining(null), 1500)
    }

    const columns = [
        {
            title: t("remitPool.corridor"),
            dataIndex: "corridor",
            key: "corridor",
            render: (text: string) => <Text strong className="remitpool__table-corridor">{text}</Text>,
        },
        {
            title: t("remitPool.myContribution"),
            dataIndex: "contribution",
            key: "contribution",
            render: (text: string) => <Text className="remitpool__table-value">{text}</Text>,
        },
        {
            title: t("remitPool.poolTotal"),
            dataIndex: "total",
            key: "total",
            render: (text: string) => <Text className="remitpool__table-value">{text}</Text>,
        },
        {
            title: t("remitPool.savings"),
            dataIndex: "savings",
            key: "savings",
            render: (text: string) => (
                <Text strong className="remitpool__table-savings">{text}</Text>
            ),
        },
        {
            title: t("remitPool.status"),
            dataIndex: "status",
            key: "status",
            render: (status: MyPool["status"]) => (
                <Badge
                    status={STATUS_MAP[status].color as any}
                    text={<Text style={{ fontSize: 12 }}>{STATUS_MAP[status].label}</Text>}
                />
            ),
        },
        {
            title: t("remitPool.date"),
            dataIndex: "date",
            key: "date",
            render: (text: string) => <Text className="remitpool__table-date">{text}</Text>,
        },
    ]

    return (
        <div className="remitpool-page">
            <div className="remitpool">

                {/* AI Banner */}
                <Alert
                    type="info"
                    showIcon
                    icon={<span className="remitpool__ai-icon">✦</span>}
                    message={<Text strong className="remitpool__ai-label">{t("remitPool.aiLabel")}</Text>}
                    description={
                        <Flex align="center" justify="space-between" gap={12}>
                            <Text className="remitpool__ai-message">{t("remitPool.aiMessage")}</Text>
                            <Button type="primary" size="small" onClick={() => handleJoin("1")}>
                                {t("remitPool.joinNow")}
                            </Button>
                        </Flex>
                    }
                    className="remitpool__ai-banner"
                />

                {/* Stats Row */}
                <div className="remitpool__stats">
                    <Card className="remitpool__stat-card">
                        <Text className="remitpool__stat-label">{t("remitPool.activePoolCount")}</Text>
                        <Text strong className="remitpool__stat-value">3</Text>
                    </Card>
                    <Card className="remitpool__stat-card">
                        <Text className="remitpool__stat-label">{t("remitPool.totalMembers")}</Text>
                        <Text strong className="remitpool__stat-value">16</Text>
                    </Card>
                    <Card className="remitpool__stat-card">
                        <Text className="remitpool__stat-label">{t("remitPool.totalSaved")}</Text>
                        <Text strong className="remitpool__stat-value remitpool__stat-value--green">$35</Text>
                    </Card>
                    <Card className="remitpool__stat-card">
                        <Text className="remitpool__stat-label">{t("remitPool.myPools")}</Text>
                        <Text strong className="remitpool__stat-value">3</Text>
                    </Card>
                </div>

                {/* Active Pools */}
                <div className="remitpool__section-header">
                    <Flex align="center" gap={8}>
                        <TbPool size={18} className="remitpool__section-icon" />
                        <Title level={5} className="remitpool__section-title">{t("remitPool.activePools")}</Title>
                    </Flex>
                </div>

                <div className="remitpool__pools-grid">
                    {ACTIVE_POOLS.map(pool => (
                        <Card key={pool.id} className={`remitpool__pool-card ${pool.myContribution ? "remitpool__pool-card--joined" : ""}`}>

                            {/* Corridor */}
                            <Flex align="center" gap={10} className="remitpool__pool-corridor">
                                <Text className="remitpool__pool-flag">{pool.fromFlag}</Text>
                                <Text strong className="remitpool__pool-currency">{pool.from}</Text>
                                <TbArrowRight size={14} className="remitpool__pool-arrow" />
                                <Text className="remitpool__pool-flag">{pool.toFlag}</Text>
                                <Text strong className="remitpool__pool-currency">{pool.to}</Text>
                                {pool.myContribution && (
                                    <Tag color="blue" className="remitpool__joined-tag">{t("remitPool.joined")}</Tag>
                                )}
                            </Flex>

                            {/* Progress */}
                            <div className="remitpool__pool-progress">
                                <Flex justify="space-between" className="remitpool__pool-progress-labels">
                                    <Text className="remitpool__pool-collected">
                                        {pool.currency}{pool.collected.toLocaleString()} {t("remitPool.collected")}
                                    </Text>
                                    <Text className="remitpool__pool-target">
                                        {t("remitPool.target")}: {pool.currency}{pool.target.toLocaleString()}
                                    </Text>
                                </Flex>
                                <Progress
                                    percent={Math.round((pool.collected / pool.target) * 100)}
                                    strokeColor={{ from: "#1b4fd8", to: "#0ea371" }}
                                    trailColor="var(--progress-trail)"
                                    showInfo={false}
                                    strokeWidth={8}
                                />
                            </div>

                            {/* Meta */}
                            <div className="remitpool__pool-meta">
                                <Flex align="center" gap={6}>
                                    <TbUsers size={13} className="remitpool__pool-meta-icon" />
                                    <Text className="remitpool__pool-meta-text">
                                        {pool.members} {t("remitPool.members")}
                                    </Text>
                                </Flex>
                                <Flex align="center" gap={6}>
                                    <TbSparkles size={13} className="remitpool__pool-meta-icon" />
                                    <Text className="remitpool__pool-meta-text">
                                        {t("remitPool.commission")}: {pool.commission}
                                    </Text>
                                </Flex>
                                <Text className="remitpool__pool-closes">
                                    {t("remitPool.closesIn")}: {pool.closesIn}
                                </Text>
                            </div>

                            {/* Footer */}
                            <Flex justify="space-between" align="center" className="remitpool__pool-footer">
                                <div>
                                    <Text className="remitpool__pool-savings-label">{t("remitPool.estSavings")}</Text>
                                    <Text strong className="remitpool__pool-savings-value">{pool.savings}</Text>
                                </div>
                                {pool.myContribution ? (
                                    <Flex vertical align="flex-end" gap={2}>
                                        <Text className="remitpool__my-contribution-label">{t("remitPool.myContribution")}</Text>
                                        <Text strong className="remitpool__my-contribution-value">
                                            {pool.currency}{pool.myContribution}
                                        </Text>
                                    </Flex>
                                ) : (
                                    <Button
                                        type="primary"
                                        size="small"
                                        loading={joining === pool.id}
                                        onClick={() => handleJoin(pool.id)}
                                        className="remitpool__join-btn"
                                    >
                                        {t("remitPool.join")}
                                    </Button>
                                )}
                            </Flex>
                        </Card>
                    ))}
                </div>

                {/* My Pools Table */}
                <Card className="remitpool__history-card">
                    <Flex align="center" gap={8} className="remitpool__history-header">
                        <TbPool size={16} className="remitpool__section-icon" />
                        <Title level={5} className="remitpool__section-title">{t("remitPool.myPoolHistory")}</Title>
                    </Flex>
                    <Table
                        dataSource={MY_POOLS}
                        columns={columns}
                        rowKey="id"
                        pagination={false}
                        className="remitpool__table"
                        size="small"
                    />
                </Card>

            </div>
        </div>
    )
}

export default withLayout(<RemitPool />)