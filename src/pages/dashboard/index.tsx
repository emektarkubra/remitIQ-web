import { useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import { Alert, Badge, Button, Card, Flex, List, Statistic, Tag, Typography } from "antd"
import { ArrowDownOutlined, ArrowUpOutlined, MinusOutlined } from "@ant-design/icons"
import * as echarts from "echarts"
import withLayout from "../../layout/withLayout"
import "./index.scss"

const { Text, Title } = Typography

interface StatCardData {
    label: string
    value: string
    change: string
    changeType: "up" | "down" | "neutral"
}

interface Transfer {
    flag: string
    name: string
    channel: string
    time: string
    amount: string
    rate: string
    status: "done" | "pending" | "processing"
}

interface UpcomingPayment {
    flag: string
    name: string
    purpose: string
    daysLeft: string
    amount: string
    note: string
}

interface AiInsight {
    percent: string
    days: number
    currency: string
    amount: string
}

const STATUS_COLORS: Record<Transfer["status"], "success" | "processing" | "warning"> = {
    done: "success",
    processing: "processing",
    pending: "warning",
}

// ── Mock data — ileride API'den gelecek ───────────────────────────────────
const AI_INSIGHT: AiInsight = {
    percent: "1.8",
    days: 3,
    currency: "₺",
    amount: "340",
}

const Dashboard = () => {
    const { t } = useTranslation()
    const chartRef = useRef<HTMLDivElement>(null)

    const STAT_CARDS: StatCardData[] = [
        { label: t("dashboard.sentThisMonth"), value: "$2,840", change: "%12", changeType: "up" },
        { label: t("dashboard.totalSavings"), value: "$184", change: t("dashboard.changeWithAi"), changeType: "up" },
        { label: t("dashboard.activeTransfers"), value: "3", change: t("dashboard.changeInProgress"), changeType: "neutral" },
        { label: t("dashboard.avgCommission"), value: "%1.2", change: "%0.4", changeType: "down" },
    ]

    const RECENT_TRANSFERS: Transfer[] = [
        { flag: "🇹🇷", name: "Ayşe E. (Anne)", channel: "Wise", time: `${t("dashboard.today")} 09:14`, amount: "$500", rate: "1 USD = 33.92 TRY", status: "done" },
        { flag: "🇩🇪", name: "Mehmet K.", channel: "Remitly", time: `${t("dashboard.yesterday")} 16:30`, amount: "€200", rate: "1 EUR = 36.84 TRY", status: "processing" },
        { flag: "🇬🇧", name: "Fatma Y.", channel: "Wise", time: `3 ${t("dashboard.daysAgo")}`, amount: "£150", rate: "1 GBP = 43.12 TRY", status: "done" },
    ]

    const UPCOMING_PAYMENTS: UpcomingPayment[] = [
        { flag: "🇹🇷", name: "Ayşe E. (Anne)", purpose: t("dashboard.purposeRent"), daysLeft: `5 ${t("dashboard.daysLater")}`, amount: "$400", note: t("dashboard.autoScheduled") },
        { flag: "🇹🇷", name: "Mehmet E. (Kardeş)", purpose: t("dashboard.purposeSchool"), daysLeft: `12 ${t("dashboard.daysLater")}`, amount: "$250", note: t("dashboard.aiWillOptimize") },
    ]

    useEffect(() => {
        if (!chartRef.current) return
        const chart = echarts.init(chartRef.current)

        chart.setOption({
            grid: { top: 16, right: 24, bottom: 40, left: 48 },
            tooltip: {
                trigger: "axis",
                backgroundColor: "#fff",
                borderColor: "#e4e1d8",
                borderWidth: 1,
                textStyle: { color: "#1a1814", fontSize: 12 },
                formatter: (params: any) =>
                    `<b>${params[0].axisValue}</b><br/>1 USD = ${params[0].value} TRY`,
            },
            legend: {
                bottom: 0,
                textStyle: { color: "#6b6760", fontSize: 11 },
                itemWidth: 16,
                itemHeight: 3,
            },
            xAxis: {
                type: "category",
                data: ["1 Haz", "5 Haz", "10 Haz", "15 Haz", "20 Haz", "25 Haz", t("dashboard.today"), "+2g", "+5g"],
                axisLine: { lineStyle: { color: "#e4e1d8" } },
                axisTick: { show: false },
                axisLabel: { color: "#9e9a92", fontSize: 11 },
            },
            yAxis: {
                type: "value",
                min: 33.0,
                max: 35.0,
                splitLine: { lineStyle: { color: "#e4e1d8", type: "dashed" } },
                axisLabel: { color: "#9e9a92", fontSize: 11, formatter: (v: number) => v.toFixed(1) },
            },
            series: [
                {
                    name: t("dashboard.chartActual"),
                    type: "line",
                    data: [33.4, 33.6, 33.2, 33.8, 33.5, 33.9, 33.92],
                    smooth: true,
                    symbolSize: 6,
                    lineStyle: { color: "#1b4fd8", width: 2.5 },
                    itemStyle: { color: "#1b4fd8", borderColor: "#fff", borderWidth: 2 },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: "rgba(27,79,216,0.15)" },
                            { offset: 1, color: "rgba(27,79,216,0)" },
                        ]),
                    },
                },
                {
                    name: t("dashboard.chartForecast"),
                    type: "line",
                    data: [null, null, null, null, null, 33.9, 34.1, 34.4, 34.8],
                    smooth: true,
                    symbolSize: 5,
                    lineStyle: { color: "#0ea371", width: 2, type: "dashed" },
                    itemStyle: { color: "#0ea371", borderColor: "#fff", borderWidth: 2 },
                },
            ],
        })

        const handleResize = () => chart.resize()
        window.addEventListener("resize", handleResize)
        return () => { window.removeEventListener("resize", handleResize); chart.dispose() }
    }, [t])

    return (
        <div className="dashboard">

            {/* AI Banner */}
            <Alert
                type="info"
                showIcon
                icon={<span className="dashboard__insight-icon">✦</span>}
                message={
                    <Text strong className="dashboard__insight-label">
                        {t("dashboard.aiLabel")}
                    </Text>
                }
                description={
                    <div className="dashboard__insight-description">
                        <Text className="dashboard__insight-message">
                            {t("dashboard.aiMessage", { percent: AI_INSIGHT.percent, days: AI_INSIGHT.days })}{" "}
                            <Text className="dashboard__insight-message--strong">
                                {t("dashboard.aiMessageStrong")}
                            </Text>{" "}
                            {t("dashboard.aiMessageSuffix", { currency: AI_INSIGHT.currency, amount: AI_INSIGHT.amount })}
                        </Text>
                        <Button type="primary" size="small">{t("dashboard.sendButton")}</Button>
                    </div>
                }
                className="dashboard__insight"
            />

            {/* Stat Cards */}
            <div className="dashboard__stats">
                {STAT_CARDS.map((card) => (
                    <Card key={card.label} className="dashboard__stat-card">
                        <Statistic
                            title={<Text type="secondary" className="dashboard__stat-card-label">{card.label}</Text>}
                            value={card.value}
                            valueStyle={{ fontSize: 26, fontWeight: 700, color: "#1a1814", letterSpacing: "-0.5px" }}
                            suffix={
                                <Tag
                                    icon={
                                        card.changeType === "up" ? <ArrowUpOutlined /> :
                                            card.changeType === "down" ? <ArrowDownOutlined /> :
                                                <MinusOutlined />
                                    }
                                    color={
                                        card.changeType === "up" ? "success" :
                                            card.changeType === "down" ? "error" :
                                                "default"
                                    }
                                    className="dashboard__stat-card-tag"
                                >
                                    {card.change}
                                </Tag>
                            }
                        />
                    </Card>
                ))}
            </div>

            {/* Bottom Grid */}
            <div className="dashboard__bottom">

                {/* Rate Chart */}
                <Card
                    className="dashboard__chart-card page-card"
                    title={<Title level={5} className="dashboard__chart-card-title">{t("dashboard.chartTitle")}</Title>}
                    extra={
                        <Flex gap={8}>
                            <Button size="small">{t("dashboard.chart1w")}</Button>
                            <Button size="small" type="primary">{t("dashboard.chart1m")}</Button>
                            <Button size="small">{t("dashboard.chart3m")}</Button>
                        </Flex>
                    }
                >
                    <div ref={chartRef} className="dashboard__chart-card-chart" />
                </Card>

                {/* Recent Transfers */}
                <Card
                    className="page-card"
                    title={<Title level={5} className="dashboard__card-title">{t("dashboard.recentTransfersTitle")}</Title>}
                    extra={<Button type="link" size="small">{t("dashboard.viewAll")}</Button>}
                >
                    <List
                        dataSource={RECENT_TRANSFERS}
                        renderItem={(item) => (
                            <List.Item
                                className="dashboard__transfer"
                                actions={[
                                    <Badge
                                        key="status"
                                        status={STATUS_COLORS[item.status]}
                                        text={
                                            <Text className="dashboard__transfer-status">
                                                {t(`dashboard.status${item.status.charAt(0).toUpperCase() + item.status.slice(1)}`)}
                                            </Text>
                                        }
                                    />,
                                ]}
                            >
                                <List.Item.Meta
                                    avatar={<div className="transfer-flag">{item.flag}</div>}
                                    title={<Text strong className="dashboard__transfer-name">{item.name}</Text>}
                                    description={
                                        <Text type="secondary" className="dashboard__transfer-channel">
                                            {item.channel} · {item.time}
                                        </Text>
                                    }
                                />
                                <div className="dashboard__transfer-amount">
                                    <Text strong className="dashboard__transfer-value">{item.amount}</Text>
                                    <Text type="secondary" className="dashboard__transfer-rate">{item.rate}</Text>
                                </div>
                            </List.Item>
                        )}
                    />
                </Card>

                {/* Upcoming Payments */}
                <Card
                    className="page-card"
                    title={<Title level={5} className="dashboard__card-title">{t("dashboard.upcomingPaymentsTitle")}</Title>}
                    extra={<Button type="link" size="small">{t("dashboard.edit")}</Button>}
                >
                    <List
                        dataSource={UPCOMING_PAYMENTS}
                        renderItem={(p) => (
                            <List.Item
                                className="dashboard__transfer"
                                actions={[
                                    <Badge
                                        key="status"
                                        status="warning"
                                        text={
                                            <Text className="dashboard__transfer-status">
                                                {t("dashboard.statusPending")}
                                            </Text>
                                        }
                                    />,
                                ]}
                            >
                                <List.Item.Meta
                                    avatar={<div className="transfer-flag">{p.flag}</div>}
                                    title={<Text strong className="dashboard__transfer-name">{p.name}</Text>}
                                    description={
                                        <Text type="secondary" className="dashboard__transfer-channel">
                                            {p.purpose} · {p.daysLeft}
                                        </Text>
                                    }
                                />
                                <div className="dashboard__transfer-amount">
                                    <Text strong className="dashboard__transfer-value">{p.amount}</Text>
                                    <Text type="secondary" className="dashboard__transfer-rate">{p.note}</Text>
                                </div>
                            </List.Item>
                        )}
                        footer={
                            <div className="dashboard__savings-footer">
                                <Text type="secondary" className="dashboard__savings-footer-label">
                                    {t("dashboard.aiSavingsEstimate")}
                                </Text>
                                <Text strong className="dashboard__savings-footer-value">+$47</Text>
                            </div>
                        }
                    />
                </Card>

            </div>
        </div>
    )
}

export default withLayout(<Dashboard />)