import { useEffect, useRef } from "react"
import { useTranslation } from "react-i18next"
import { Card, Flex, Select, Tag, Typography } from "antd"
import { TbArrowDownRight, TbArrowUpRight, TbChartBar, TbChartPie, TbTrendingUp } from "react-icons/tb"
import * as echarts from "echarts"
import withLayout from "../../layout/withLayout"
import "./index.scss"

const { Text, Title } = Typography

const Analytics = () => {
    const { t } = useTranslation()

    const barChartRef = useRef<HTMLDivElement>(null)
    const pieChartRef = useRef<HTMLDivElement>(null)
    const lineChartRef = useRef<HTMLDivElement>(null)
    const savingsChartRef = useRef<HTMLDivElement>(null)

    // ── Bar Chart ─────────────────────────────────────────────────────────
    useEffect(() => {
        if (!barChartRef.current) return
        const chart = echarts.init(barChartRef.current)

        chart.setOption({
            grid: { top: 16, right: 16, bottom: 32, left: 52 },
            tooltip: {
                trigger: "axis",
                backgroundColor: "#fff",
                borderColor: "#e4e1d8",
                borderWidth: 1,
                textStyle: { color: "#1a1814", fontSize: 12 },
            },
            xAxis: {
                type: "category",
                data: ["Oca", "Şub", "Mar", "Nis", "May", "Haz"],
                axisLine: { lineStyle: { color: "#e4e1d8" } },
                axisTick: { show: false },
                axisLabel: { color: "#9e9a92", fontSize: 11 },
            },
            yAxis: {
                type: "value",
                splitLine: { lineStyle: { color: "#e4e1d8", type: "dashed" } },
                axisLabel: { color: "#9e9a92", fontSize: 11, formatter: (v: number) => `$${v}` },
            },
            series: [{
                type: "bar",
                data: [1100, 1380, 1520, 1260, 1740, 2840],
                barMaxWidth: 48,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: "#1b4fd8" },
                        { offset: 1, color: "#1b4fd840" },
                    ]),
                    borderRadius: [6, 6, 0, 0],
                },
                emphasis: { itemStyle: { color: "#1640b8" } },
            }],
        })

        const observer = new ResizeObserver(() => chart.resize())
        observer.observe(barChartRef.current!)
        return () => { observer.disconnect(); chart.dispose() }
    }, [])

    // ── Pie Chart ─────────────────────────────────────────────────────────
    useEffect(() => {
        if (!pieChartRef.current) return
        const chart = echarts.init(pieChartRef.current)

        chart.setOption({
            tooltip: {
                trigger: "item",
                backgroundColor: "#fff",
                borderColor: "#e4e1d8",
                borderWidth: 1,
                textStyle: { color: "#1a1814", fontSize: 12 },
                formatter: "{b}: ${c} (%{d}%)",
            },
            legend: {
                bottom: 0,
                textStyle: { color: "#6b6760", fontSize: 11 },
                itemWidth: 10,
                itemHeight: 10,
            },
            series: [{
                type: "pie",
                radius: ["45%", "72%"],
                center: ["50%", "44%"],
                avoidLabelOverlap: false,
                label: { show: false },
                data: [
                    { name: "Ayşe E.", value: 4200, itemStyle: { color: "#1b4fd8" } },
                    { name: "Mehmet K.", value: 2100, itemStyle: { color: "#0ea371" } },
                    { name: "Fatma Y.", value: 1260, itemStyle: { color: "#d97706" } },
                    { name: "Mehmet E.", value: 860, itemStyle: { color: "#7c3aed" } },
                ],
            }],
        })

        const observer = new ResizeObserver(() => chart.resize())
        observer.observe(pieChartRef.current!)
        return () => { observer.disconnect(); chart.dispose() }
    }, [])

    // ── Line Chart ────────────────────────────────────────────────────────
    useEffect(() => {
        if (!lineChartRef.current) return
        const chart = echarts.init(lineChartRef.current)

        chart.setOption({
            grid: { top: 16, right: 16, bottom: 32, left: 52 },
            tooltip: {
                trigger: "axis",
                backgroundColor: "#fff",
                borderColor: "#e4e1d8",
                borderWidth: 1,
                textStyle: { color: "#1a1814", fontSize: 12 },
            },
            legend: {
                bottom: 0,
                textStyle: { color: "#6b6760", fontSize: 11 },
                itemWidth: 14, itemHeight: 3,
            },
            xAxis: {
                type: "category",
                data: ["Oca", "Şub", "Mar", "Nis", "May", "Haz"],
                axisLine: { lineStyle: { color: "#e4e1d8" } },
                axisTick: { show: false },
                axisLabel: { color: "#9e9a92", fontSize: 11 },
            },
            yAxis: {
                type: "value",
                min: 28,
                splitLine: { lineStyle: { color: "#e4e1d8", type: "dashed" } },
                axisLabel: { color: "#9e9a92", fontSize: 11, formatter: (v: number) => v.toFixed(0) },
            },
            series: [
                {
                    name: "USD/TRY",
                    type: "line",
                    data: [29.4, 30.2, 31.5, 32.1, 33.0, 33.92],
                    smooth: true,
                    symbolSize: 5,
                    lineStyle: { color: "#1b4fd8", width: 2.5 },
                    itemStyle: { color: "#1b4fd8" },
                    areaStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: "rgba(27,79,216,0.12)" },
                            { offset: 1, color: "rgba(27,79,216,0)" },
                        ]),
                    },
                },
                {
                    name: "EUR/TRY",
                    type: "line",
                    data: [31.2, 32.5, 34.0, 35.2, 36.1, 36.84],
                    smooth: true,
                    symbolSize: 5,
                    lineStyle: { color: "#0ea371", width: 2.5 },
                    itemStyle: { color: "#0ea371" },
                },
            ],
        })

        const observer = new ResizeObserver(() => chart.resize())
        observer.observe(lineChartRef.current!)
        return () => { observer.disconnect(); chart.dispose() }
    }, [])

    // ── Savings Chart ─────────────────────────────────────────────────────
    useEffect(() => {
        if (!savingsChartRef.current) return
        const chart = echarts.init(savingsChartRef.current)

        chart.setOption({
            grid: { top: 16, right: 16, bottom: 32, left: 44 },
            tooltip: {
                trigger: "axis",
                backgroundColor: "#fff",
                borderColor: "#e4e1d8",
                borderWidth: 1,
                textStyle: { color: "#1a1814", fontSize: 12 },
                formatter: (params: any) => `${params[0].axisValue}: $${params[0].value}`,
            },
            xAxis: {
                type: "category",
                data: ["Oca", "Şub", "Mar", "Nis", "May", "Haz"],
                axisLine: { lineStyle: { color: "#e4e1d8" } },
                axisTick: { show: false },
                axisLabel: { color: "#9e9a92", fontSize: 11 },
            },
            yAxis: {
                type: "value",
                splitLine: { lineStyle: { color: "#e4e1d8", type: "dashed" } },
                axisLabel: { color: "#9e9a92", fontSize: 11, formatter: (v: number) => `$${v}` },
            },
            series: [{
                type: "bar",
                data: [22, 28, 31, 26, 39, 47],
                barMaxWidth: 40,
                itemStyle: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        { offset: 0, color: "#0ea371" },
                        { offset: 1, color: "#0ea37140" },
                    ]),
                    borderRadius: [6, 6, 0, 0],
                },
            }],
        })

        const observer = new ResizeObserver(() => chart.resize())
        observer.observe(savingsChartRef.current!)
        return () => { observer.disconnect(); chart.dispose() }
    }, [])

    return (
        <div className="analytics-page">
            <div className="analytics">

                {/* Header */}
                <Flex justify="space-between" align="center" wrap="wrap" gap={12}>
                    <div>
                        <Title level={4} className="analytics__title">{t("analytics.title")}</Title>
                        <Text className="analytics__subtitle">{t("analytics.subtitle")}</Text>
                    </div>
                    <Select
                        defaultValue="6m"
                        className="analytics__period-select"
                        options={[
                            { value: "1m", label: t("analytics.1month") },
                            { value: "3m", label: t("analytics.3months") },
                            { value: "6m", label: t("analytics.6months") },
                            { value: "1y", label: t("analytics.1year") },
                        ]}
                    />
                </Flex>

                {/* KPI Cards */}
                <div className="analytics__kpis">
                    {[
                        { label: t("analytics.totalSent"), value: "$8,420", change: "+18%", up: true, icon: <TbChartBar size={18} /> },
                        { label: t("analytics.totalSavings"), value: "$193", change: "+24%", up: true, icon: <TbTrendingUp size={18} /> },
                        { label: t("analytics.avgRate"), value: "33.84", change: "+4.2%", up: true, icon: <TbChartBar size={18} /> },
                        { label: t("analytics.totalFees"), value: "$47.20", change: "-12%", up: false, icon: <TbChartPie size={18} /> },
                    ].map((kpi, i) => (
                        <Card key={i} className="analytics__kpi-card">
                            <Flex justify="space-between" align="flex-start">
                                <div>
                                    <Text className="analytics__kpi-label">{kpi.label}</Text>
                                    <Text strong className="analytics__kpi-value">{kpi.value}</Text>
                                    <Flex align="center" gap={4} className="analytics__kpi-change">
                                        {kpi.up
                                            ? <TbArrowUpRight size={13} className="analytics__change-icon analytics__change-icon--up" />
                                            : <TbArrowDownRight size={13} className="analytics__change-icon analytics__change-icon--down" />
                                        }
                                        <Text className={`analytics__change-text ${kpi.up ? "analytics__change-text--up" : "analytics__change-text--down"}`}>
                                            {kpi.change} {t("analytics.vsLastPeriod")}
                                        </Text>
                                    </Flex>
                                </div>
                                <div className="analytics__kpi-icon">{kpi.icon}</div>
                            </Flex>
                        </Card>
                    ))}
                </div>

                {/* Charts Row 1 */}
                <div className="analytics__charts-row">
                    <Card className="analytics__chart-card">
                        <Flex justify="space-between" align="center" className="analytics__chart-header">
                            <Title level={5} className="analytics__card-title">{t("analytics.monthlySent")}</Title>
                            <Tag color="blue">2025</Tag>
                        </Flex>
                        <div ref={barChartRef} className="analytics__chart" />
                    </Card>

                    <Card className="analytics__chart-card">
                        <Flex justify="space-between" align="center" className="analytics__chart-header">
                            <Title level={5} className="analytics__card-title">{t("analytics.byRecipient")}</Title>
                        </Flex>
                        <div ref={pieChartRef} className="analytics__chart" />
                    </Card>
                </div>

                {/* Charts Row 2 */}
                <div className="analytics__charts-row">
                    <Card className="analytics__chart-card">
                        <Flex justify="space-between" align="center" className="analytics__chart-header">
                            <Title level={5} className="analytics__card-title">{t("analytics.rateTrend")}</Title>
                            <Flex gap={8}>
                                <Tag color="blue">USD/TRY</Tag>
                                <Tag color="green">EUR/TRY</Tag>
                            </Flex>
                        </Flex>
                        <div ref={lineChartRef} className="analytics__chart" />
                    </Card>

                    <Card className="analytics__chart-card">
                        <Flex justify="space-between" align="center" className="analytics__chart-header">
                            <Title level={5} className="analytics__card-title">{t("analytics.monthlySavings")}</Title>
                            <Tag color="green">AI</Tag>
                        </Flex>
                        <div ref={savingsChartRef} className="analytics__chart" />
                    </Card>
                </div>

                {/* Channel Breakdown */}
                <Card className="analytics__breakdown-card">
                    <Title level={5} className="analytics__card-title" style={{ marginBottom: 16 }}>
                        {t("analytics.channelBreakdown")}
                    </Title>
                    <div className="analytics__breakdown-list">
                        {[
                            { name: "Wise", amount: "$5,420", percent: 64, color: "#1b4fd8" },
                            { name: "Remitly", amount: "$2,100", percent: 25, color: "#0ea371" },
                            { name: "Western Union", amount: "$900", percent: 11, color: "#d97706" },
                        ].map((ch, i) => (
                            <div key={i} className="analytics__breakdown-item">
                                <Flex justify="space-between" align="center" className="analytics__breakdown-header">
                                    <Flex align="center" gap={8}>
                                        <div className="analytics__breakdown-dot" style={{ background: ch.color }} />
                                        <Text strong className="analytics__breakdown-name">{ch.name}</Text>
                                    </Flex>
                                    <Flex align="center" gap={12}>
                                        <Text className="analytics__breakdown-amount">{ch.amount}</Text>
                                        <Text className="analytics__breakdown-percent">{ch.percent}%</Text>
                                    </Flex>
                                </Flex>
                                <div className="analytics__breakdown-bar-bg">
                                    <div
                                        className="analytics__breakdown-bar-fill"
                                        style={{ width: `${ch.percent}%`, background: ch.color }}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

            </div>
        </div>
    )
}

export default withLayout(<Analytics />)