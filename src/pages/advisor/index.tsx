import { useState } from "react"
import { useTranslation } from "react-i18next"
import {
    Alert, Button, Card, Flex, Input,
    Progress, Tag, Typography
} from "antd"
import { TbArrowUp, TbArrowDown, TbBrain, TbClock, TbMinus, TbSend, TbSparkles, TbTrendingUp } from "react-icons/tb"
import * as echarts from "echarts"
import { useEffect, useRef } from "react"
import withLayout from "../../layout/withLayout"
import "./index.scss"

const { Text, Title } = Typography

// ── Types ──────────────────────────────────────────────────────────────────

interface DayForecast {
    day: string
    rate: number
    trend: "up" | "down" | "neutral"
    isToday: boolean
}

interface Recommendation {
    type: "wait" | "warning" | "opportunity"
    title: string
    message: string
}

interface ChatMessage {
    role: "user" | "ai"
    text: string
}

// ── Mock Data ──────────────────────────────────────────────────────────────

const FORECAST: DayForecast[] = [
    { day: "Bugün", rate: 33.92, trend: "down", isToday: true },
    { day: "Yarın", rate: 34.10, trend: "up", isToday: false },
    { day: "Çrş", rate: 34.40, trend: "up", isToday: false },
    { day: "Prş", rate: 34.60, trend: "up", isToday: false },
    { day: "Cum", rate: 34.80, trend: "up", isToday: false },
    { day: "Cmt", rate: 34.50, trend: "down", isToday: false },
    { day: "Paz", rate: 34.30, trend: "down", isToday: false },
    { day: "+8g", rate: 34.70, trend: "up", isToday: false },
    { day: "+9g", rate: 35.00, trend: "up", isToday: false },
    { day: "+10g", rate: 35.20, trend: "up", isToday: false },
    { day: "+11g", rate: 34.90, trend: "down", isToday: false },
    { day: "+12g", rate: 34.20, trend: "down", isToday: false },
    { day: "+13g", rate: 34.80, trend: "up", isToday: false },
    { day: "+14g", rate: 35.10, trend: "up", isToday: false },
]

const RECOMMENDATIONS: Recommendation[] = [
    {
        type: "wait",
        title: "3 Gün Bekle",
        message: "Anne transferini 3 gün sonraya ertelersen tahminen ₺610 daha alırsın.",
    },
    {
        type: "warning",
        title: "TCMB Toplantısı",
        message: "8 Tem'de merkez bankası toplantısı var. Büyük transfer önerilmez.",
    },
    {
        type: "opportunity",
        title: "Pool Fırsatı",
        message: "USD→TRY havuzu 2 saat kapanıyor. Katılırsan $12 ekstra tasarruf.",
    },
]

const INITIAL_MESSAGES: ChatMessage[] = [
    { role: "ai", text: "Merhaba! Ben RemitIQ AI Danışmanıyım. Kur tahminleri, transfer zamanlaması veya tasarruf önerileri hakkında soru sorabilirsin." },
]

// ── Page ───────────────────────────────────────────────────────────────────

const Advisor = () => {
    const { t } = useTranslation()
    const chartRef = useRef<HTMLDivElement>(null)
    const chatEndRef = useRef<HTMLDivElement>(null)

    const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES)
    const [input, setInput] = useState("")
    const [isTyping, setIsTyping] = useState(false)

    // Chart
    useEffect(() => {
        if (!chartRef.current) return
        const chart = echarts.init(chartRef.current)

        chart.setOption({
            grid: { top: 16, right: 16, bottom: 32, left: 48 },
            tooltip: {
                trigger: "axis",
                backgroundColor: "#fff",
                borderColor: "#e4e1d8",
                borderWidth: 1,
                textStyle: { color: "#1a1814", fontSize: 12 },
                formatter: (params: any) =>
                    `<b>${params[0].axisValue}</b><br/>1 USD = ${params[0].value} TRY`,
            },
            xAxis: {
                type: "category",
                data: FORECAST.map(f => f.day),
                axisLine: { lineStyle: { color: "#e4e1d8" } },
                axisTick: { show: false },
                axisLabel: { color: "#9e9a92", fontSize: 10 },
            },
            yAxis: {
                type: "value",
                min: 33.5,
                max: 35.5,
                splitLine: { lineStyle: { color: "#e4e1d8", type: "dashed" } },
                axisLabel: { color: "#9e9a92", fontSize: 10, formatter: (v: number) => v.toFixed(1) },
            },
            series: [
                {
                    name: "Gerçek",
                    type: "line",
                    data: [33.92, null, null, null, null, null, null, null, null, null, null, null, null, null],
                    smooth: true,
                    symbolSize: 7,
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
                    name: "AI Tahmini",
                    type: "line",
                    data: FORECAST.map(f => f.rate),
                    smooth: true,
                    symbolSize: 5,
                    lineStyle: { color: "#0ea371", width: 2, type: "dashed" },
                    itemStyle: { color: "#0ea371", borderColor: "#fff", borderWidth: 2 },
                },
            ],
            legend: {
                bottom: 0,
                textStyle: { color: "#6b6760", fontSize: 11 },
                itemWidth: 16,
                itemHeight: 3,
            },
        })

        const handleResize = () => chart.resize()
        window.addEventListener("resize", handleResize)
        return () => { window.removeEventListener("resize", handleResize); chart.dispose() }
    }, [])

    // Chat scroll
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    const handleSend = () => {
        if (!input.trim()) return

        const userMsg: ChatMessage = { role: "user", text: input }
        setMessages(prev => [...prev, userMsg])
        setInput("")
        setIsTyping(true)

        // Mock AI response
        setTimeout(() => {
            const aiResponses: Record<string, string> = {
                "kur": "Şu an USD/TRY kuru 33.92 seviyesinde. AI tahminime göre önümüzdeki 3 günde %1.8 artış bekleniyor. En iyi gönderim günü: +3. gün.",
                "transfer": "Transfer zamanlaması için AI Optimize seçeneğini kullanmanı öneririm. Sistem kuru takip eder ve en iyi anda otomatik gönderir.",
                "pool": "Şu an aktif 3 RemitPool var. USD→TRY havuzunda 8 üye var ve 2 saat içinde kapanıyor. Katılırsan $12 tasarruf edebilirsin.",
                "tasarruf": "Bu ay AI optimizasyonu sayesinde toplam $47 tasarruf ettin. Yıllık hedefin $270, şu an %68'desin.",
            }

            const key = Object.keys(aiResponses).find(k => input.toLowerCase().includes(k))
            const response = key
                ? aiResponses[key]
                : "Bu konuda sana yardımcı olmak isterim. Daha spesifik bir soru sorabilirsin: kur tahmini, transfer zamanlaması, RemitPool veya tasarruf analizi."

            setMessages(prev => [...prev, { role: "ai", text: response }])
            setIsTyping(false)
        }, 1200)
    }

    const trendIcon = (trend: DayForecast["trend"]) => {
        if (trend === "up") return <TbArrowUp size={12} />
        if (trend === "down") return <TbArrowDown size={12} />
        return <TbMinus size={12} />
    }

    const trendClass = (trend: DayForecast["trend"]) => {
        if (trend === "up") return "advisor__forecast-day--up"
        if (trend === "down") return "advisor__forecast-day--down"
        return "advisor__forecast-day--neutral"
    }

    const recClass = (type: Recommendation["type"]) => {
        if (type === "wait") return "advisor__rec--wait"
        if (type === "warning") return "advisor__rec--warning"
        if (type === "opportunity") return "advisor__rec--opportunity"
        return ""
    }

    return (
        <div className="advisor-page">
            <div className="advisor">

                {/* Top Stats */}
                <div className="advisor__stats">
                    <Card className="advisor__stat-card">
                        <Flex align="center" gap={12}>
                            <div className="advisor__score-ring">
                                <div className="advisor__score-inner">
                                    <Text strong className="advisor__score-val">70</Text>
                                    <Text className="advisor__score-label">Skor</Text>
                                </div>
                            </div>
                            <div>
                                <Text className="advisor__stat-label">{t("advisor.rateStatus")}</Text>
                                <br />
                                <Tag color="warning" style={{ marginTop: 4 }}>{t("advisor.rateMiddle")}</Tag>
                                <br />
                                <Text className="advisor__stat-desc">{t("advisor.rateDesc")}</Text>
                            </div>
                        </Flex>
                    </Card>

                    <Card className="advisor__stat-card">
                        <Text className="advisor__stat-label">{t("advisor.monthlySaving")}</Text>
                        <Text strong className="advisor__stat-big-value advisor__stat-big-value--green">$184</Text>
                        <Text className="advisor__stat-desc">{t("advisor.aiOptimized")}</Text>
                        <Progress
                            percent={68}
                            strokeColor="#0ea371"
                            trailColor="var(--progress-trail)"
                            size="small"
                            style={{ marginTop: 8 }}
                        />
                        <Text className="advisor__stat-progress-label">{t("advisor.goalProgress")}: $270</Text>
                    </Card>

                    <Card className="advisor__stat-card">
                        <Text className="advisor__stat-label">{t("advisor.modelAccuracy")}</Text>
                        <Text strong className="advisor__stat-big-value">%87</Text>
                        <Text className="advisor__stat-desc">{t("advisor.last30Days")}</Text>
                        <div className="advisor__accuracy-bars">
                            {[0.8, 0.9, 0.7, 1, 0.85, 0.9, 0.8].map((v, i) => (
                                <div
                                    key={i}
                                    className={`advisor__accuracy-bar ${v >= 0.85 ? "advisor__accuracy-bar--good" : v >= 0.75 ? "advisor__accuracy-bar--ok" : "advisor__accuracy-bar--bad"}`}
                                    style={{ height: `${v * 28}px` }}
                                />
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Chart + Recommendations */}
                <div className="advisor__middle">

                    {/* Chart */}
                    <Card className="advisor__chart-card">
                        <Flex align="center" gap={8} className="advisor__chart-header">
                            <TbTrendingUp size={16} className="advisor__icon" />
                            <Title level={5} className="advisor__card-title">{t("advisor.forecastTitle")}</Title>
                        </Flex>

                        <div ref={chartRef} className="advisor__chart" />

                        {/* 14-day forecast blocks */}
                        <div className="advisor__forecast-grid">
                            {FORECAST.map((f, i) => (
                                <div
                                    key={i}
                                    className={[
                                        "advisor__forecast-day",
                                        trendClass(f.trend),
                                        f.isToday ? "advisor__forecast-day--today" : "",
                                    ].join(" ")}
                                >
                                    <Text className="advisor__forecast-rate">{f.rate.toFixed(1)}</Text>
                                    <div className="advisor__forecast-trend">{trendIcon(f.trend)}</div>
                                    <Text className="advisor__forecast-label">{f.day}</Text>
                                </div>
                            ))}
                        </div>

                        <div className="advisor__forecast-legend">
                            <Flex align="center" gap={4}><div className="advisor__legend-dot advisor__legend-dot--up" /><Text className="advisor__legend-text">{t("advisor.goodDay")}</Text></Flex>
                            <Flex align="center" gap={4}><div className="advisor__legend-dot advisor__legend-dot--neutral" /><Text className="advisor__legend-text">{t("advisor.neutralDay")}</Text></Flex>
                            <Flex align="center" gap={4}><div className="advisor__legend-dot advisor__legend-dot--down" /><Text className="advisor__legend-text">{t("advisor.badDay")}</Text></Flex>
                            <Flex align="center" gap={4}><div className="advisor__legend-dot advisor__legend-dot--today" /><Text className="advisor__legend-text">{t("advisor.today")}</Text></Flex>
                        </div>
                    </Card>

                    {/* Recommendations */}
                    <Card className="advisor__rec-card">
                        <Flex align="center" gap={8} className="advisor__chart-header">
                            <TbSparkles size={16} className="advisor__icon" />
                            <Title level={5} className="advisor__card-title">{t("advisor.recommendations")}</Title>
                        </Flex>

                        <div className="advisor__recs">
                            {RECOMMENDATIONS.map((rec, i) => (
                                <div key={i} className={`advisor__rec ${recClass(rec.type)}`}>
                                    <Text strong className="advisor__rec-title">
                                        {rec.type === "wait" && "✓ "}
                                        {rec.type === "warning" && "⚠ "}
                                        {rec.type === "opportunity" && "💡 "}
                                        {rec.title}
                                    </Text>
                                    <Text className="advisor__rec-message">{rec.message}</Text>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* AI Chat */}
                <Card className="advisor__chat-card">
                    <Flex align="center" gap={8} className="advisor__chart-header">
                        <TbBrain size={16} className="advisor__icon" />
                        <Title level={5} className="advisor__card-title">{t("advisor.chatTitle")}</Title>
                        <Tag color="blue" style={{ marginLeft: "auto", fontSize: 10 }}>GPT-4o</Tag>
                    </Flex>

                    <div className="advisor__chat-messages">
                        {messages.map((msg, i) => (
                            <div
                                key={i}
                                className={`advisor__chat-msg advisor__chat-msg--${msg.role}`}
                            >
                                {msg.role === "ai" && (
                                    <div className="advisor__chat-avatar">✦</div>
                                )}
                                <div className="advisor__chat-bubble">
                                    <Text className="advisor__chat-text">{msg.text}</Text>
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="advisor__chat-msg advisor__chat-msg--ai">
                                <div className="advisor__chat-avatar">✦</div>
                                <div className="advisor__chat-bubble advisor__chat-bubble--typing">
                                    <span /><span /><span />
                                </div>
                            </div>
                        )}
                        <div ref={chatEndRef} />
                    </div>

                    <div className="advisor__chat-suggestions">
                        {["Kur tahmini ne?", "Ne zaman göndereyim?", "Pool fırsatı var mı?"].map((s, i) => (
                            <button
                                key={i}
                                className="advisor__chat-suggestion"
                                onClick={() => { setInput(s); }}
                            >
                                <TbClock size={12} /> {s}
                            </button>
                        ))}
                    </div>

                    <Flex gap={8} className="advisor__chat-input-row">
                        <Input
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onPressEnter={handleSend}
                            placeholder={t("advisor.chatPlaceholder")}
                            className="advisor__chat-input"
                        />
                        <Button
                            type="primary"
                            icon={<TbSend size={15} />}
                            onClick={handleSend}
                            disabled={!input.trim() || isTyping}
                            className="advisor__chat-send"
                        />
                    </Flex>
                </Card>

            </div>
        </div>
    )
}

export default withLayout(<Advisor />)