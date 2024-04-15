import streamlit as st

from configs import CONTENT_COL_CONFIG

# --------------------------------------------------------------------------------
# ---- PRICING PAGE --------------------------------------------------------------
# --------------------------------------------------------------------------------

def show_pricing_page():
    pricing_card_style = """
        <head>
            <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
            <style>
                :root {
                    --primary-color: #166088;
                    --secondary-color: #0056b3;
                    --hover-effect: all 0.15s ease-in-out;
                }
                body {
                    font-family: 'Roboto', sans-serif;
                }
                .pricing-content-container {
                    max-width: 1350px;
                    margin: auto;
                }
                .pricing-table {
                    display: flex;
                    justify-content: space-around;
                    flex-wrap: wrap;
                }
                .pricing-card {
                    display: flex;
                    flex-direction: column;
                    border: 1px solid #ddd;
                    box-shadow: 0 0 10px rgba(0,0,0,0.1);
                    padding: 20px;
                    border-radius: 10px;
                    text-align: left;
                    width: 30%;
                    transition: var(--hover-effect);
                    margin-bottom: 20px;
                    position: relative;
                }
                .pricing-card:hover,
                .btn-purchase:hover {
                    transform: scale(1.05);
                    box-shadow: 0 0 20px rgba(0,0,0,0.2);
                }
                .pricing-card h3 {
                    color: #333;
                    margin-bottom: 20px;
                }
                .pricing-card p {
                    color: #666;
                    text-indent: -1.5em;
                    padding-left: 1em;
                    margin-left: 0.5em;
                    white-space: pre-wrap;
                    word-break: break-all;
                }
                .pricing-card .bottom-section {
                    position: absolute;
                    bottom: 25px;
                    left: 20px;
                    right: 20px;
                }
                .pricing-card .price {
                    font-size: 24px;
                    color: var(--primary-color);
                    margin-bottom: 20px;
                }
                .btn-purchase {
                    background-color: #eeeeee;
                    color: red;
                    padding: 10px 20px;
                    text-decoration: none;
                    border-radius: 5px;
                    transition: var(--hover-effect);
                }
                .btn-purchase:hover {
                    background-color: grey;
                    color: black;
                }
                @media screen and (max-width: 768px) {
                    .pricing-card {
                        width: 100%;
                        margin-bottom: 20px;
                    }
                }
            </style>
        </head>
        """


    st.markdown(f"""
        <html>
        {pricing_card_style}
        <body>
        <div class="pricing-content-container">
        <h2>选择适合您的定价方案</h2>
        <p>我们提供灵活的定价方案以满足您的不同需求。请根据您的具体情况，选择适合您的方案</p>
        <br>
            <div class="pricing-table">
                <div class="pricing-card">
                    <div>
                        <h3>⛅️ 云端在线使用</h3>
                        <p>✔️ 无需部署，直接在线使用</p>
                        <p>✔️ 提供每月1000次的分析服务调用</p>
                        <p>✔️ 无需单独支付模型 API KEY 的费用</p>
                        <p>✔️ 云端自动升级，享受最新功能</p>
                        <p>✔️ 不记录您的使用数据，隐私安全</p>
                        <br><br><br><br><br>
                    </div>
                    <div class="bottom-section">
                        <div class="price">￥159 / 月</div>
                        <a href="mailto:{st.secrets["EMAIL_ADDRESS"]}" class="btn-purchase">点击咨询</a>
                    </div>
                </div>
                <div class="pricing-card">
                    <div>
                        <h3>🔒 本地私有部署</h3>
                        <p>✔️ 高度私有化，全权控制数据和服务</p>
                        <p>✔️ 使用您自己的模型 API KEY, 控制数据流量</p>
                        <p>✔️ 3次后续技术支持</p>
                        <p>✔️ 一次性支付，无需订阅永久使用</p>
                        <br><br><br><br><br>
                    </div>
                    <div class="bottom-section">
                        <div class="price">￥1299 <span style='font-size: 16px;'>（一次性部署）</span></div>
                        <a href="mailto:{st.secrets["EMAIL_ADDRESS"]}" class="btn-purchase">点击咨询</a>
                    </div>
                </div>
                <div class="pricing-card">
                    <div>
                        <h3>💼 企业定制方案</h3>
                        <p>✔️ 根据您的需求定制开发</p>
                        <p>✔️ 针对性优化数据处理和分析模型</p>
                        <p>✔️ 与我们的团队紧密合作，打造独特的分析工具</p>
                        <p>✔️ 报价根据需求定制，更贴近您的预算需求</p>
                        <br><br><br><br><br>
                    </div>
                    <div class="bottom-section">
                        <div class="price">请联系获取报价</div>
                        <a href="mailto:{st.secrets["EMAIL_ADDRESS"]}" class="btn-purchase">点击咨询</a>
                    </div>
                </div>
            </div>
        </div>
        </body>
        </html>
        """, unsafe_allow_html=True)
