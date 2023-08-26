import random
import time

import streamlit as st

from configs import ANALYSIS_FOCUS, CONTENT_COL_CONFIG, USER_POSITION
from style.color_theme import html_header_color_1
from utils.image_loader import img_to_bytes, img_to_html

# --------------------------------------------------------------------------------
# ---- HOME PAGE -----------------------------------------------------------------
# --------------------------------------------------------------------------------

def show_home_page():

    INSIGHTFUL_REVIEWS = "洞见评价 ⛳️"

    _, center, _ = st.columns(CONTENT_COL_CONFIG)

    with center: 
        st.markdown("## Hi, 欢迎来到")
        
        typing_effect = st.empty()
        with typing_effect: 
            for i in range(len(INSIGHTFUL_REVIEWS)): 
                st.markdown(f"<h1 style='color: black; font-size: 90px;'>{INSIGHTFUL_REVIEWS[:i]}_</h1>", 
                            unsafe_allow_html=True)
                time.sleep(0.15)
            st.markdown(f"<h1 style='color: black; font-size: 90px;'>{INSIGHTFUL_REVIEWS[:i]}</h1>", 
                        unsafe_allow_html=True)

        st.markdown("> Provide **Insightful Reviews** Tailored for Every Role, in 30 Seconds")
    
        st.write("---")

    # feature1_container = st.container()
    # st.write("---")
    # feature2_container = st.container()
    # st.write("---")
    # feature3_container = st.container()
    # st.write("---")
    # cta1_container = st.container()
    # cta2_container = st.container()

    # --- Feature 1: Time Saving ---
    st.markdown(f"""<h2 style='text-align: center; color: {html_header_color_1};'>
                ⚡️ 30秒生成评价分析，快如闪电 ⚡️</h2>
                """, unsafe_allow_html=True)
    st.markdown("""<h3 style='text-align: center; line-height: 2;'>
                借助先进的 🧠 GPT 大语言模型 </br>
                30秒即可处理高达1000条产品评价 </br>
                每日节省30-60分钟运营巡店时间</h3>
                """, unsafe_allow_html=True)
    #TODO: 加一个 powered by Langchain, OpenAI, Huggingface 的图片 st.image()

    _, center, _ = st.columns(CONTENT_COL_CONFIG)
    with center: 
        st.markdown("---")


    # --- Feature 2: Tailored Insights ---
    st.markdown(f"""<h2 style='text-align: center; color: {html_header_color_1};'>
                👩🏻‍🚀 根据你的需求，提供个性化分析结果 👩🏻‍🚀</h2>""", 
                unsafe_allow_html=True)
    rolling_header = st.empty()
    with rolling_header: 
        for i in range(8): 
            random_position = USER_POSITION[random.randint(1, len(USER_POSITION) - 1)]
            random_focus = ANALYSIS_FOCUS[random.randint(1, len(ANALYSIS_FOCUS) - 1)]
            st.markdown(f"""<h3 style='text-align: center; line-height: 2;'>
                        无论您的岗位是 <u>{random_position}</u>， </br>
                        关心的是 <u>{random_focus}</u>， </br>
                        我们都为您提供具有针对性的分析总结</h3>
                        """, unsafe_allow_html=True)
            time.sleep(0.4)
        st.markdown(f"""<h3 style='text-align: center; line-height: 2;'>
                    无论您身处 <u>👩🏻‍🚀 任何岗位</u>， </br>
                    关心的是产品评价的 <u>🌟 任何方面</u>， </br>
                    我们都为您提供具有针对性的分析总结</h3>
                    """, unsafe_allow_html=True)
    
    _, center, _ = st.columns(CONTENT_COL_CONFIG)
    with center: 
        st.markdown("---")


    # --- Feature 3: Compatible with All Major EC Platforms ---
    st.markdown(f"""<h2 style='text-align: center; color: {html_header_color_1};'>
                🛒 适用于全部主流电商网站 🛒</h2>
                """, unsafe_allow_html=True)
    
    _, center, _ = st.columns(CONTENT_COL_CONFIG)
    with center: 
        supported_ec_sites = img_to_bytes('assets/Supported_EC_Sites.png')
        st.markdown(f"""
            <div style="text-align: center;">
                <img src="data:image/png;base64,{supported_ec_sites}" style="width: 80%; max-width: 1500px;">
            </div>
            """, unsafe_allow_html=True)

        st.markdown("---")
    

    # --- Trusted By ---
    st.markdown(f"""
                <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" rel="stylesheet">
                <h2 style='text-align: center; color: {html_header_color_1}; margin-bottom: -0.5em;'>
                    <i class="bi bi-award" 
                    style="margin-right: 20px; font-size: 1.8em; vertical-align: top; color: grey;">
                    </i>
                    客户反馈
                    <i class="bi bi-award" 
                    style="margin-left: 20px; font-size: 1.8em; vertical-align: top; color: grey;">
                    </i> 
                </h2>
                <h2 style='text-align: center; color: #eeeeee; font-weight: bold; margin-top: -1.8em;'>Trusted By</h2>
                """, unsafe_allow_html=True)


    huofu_logo = img_to_bytes('assets/huofu_logo.png')
    teatree_logo = img_to_bytes('assets/teatree_logo.png')

    customer_feedback_card_style = """
        <style>
        .card {
            box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
            transition: 0.3s;
            width: 40%;
            max-width: 580px;
            min-width: 400px;   /* 设置卡片的最小宽度 */
            border-radius: 5px;
            padding: 10px;
            margin: 20px;
            text-align: center;
            display: inline-block;
            background-color: #f1f1f1;
        }
        .card:hover {
            box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
        }
        .container {
            padding: 2px 16px;
        }
        .center {
            display: flex;
            justify-content: center;
            align-items: center;
            flex-wrap: wrap;    /* 允许卡片换行 */
        }
        .card-logo {
            margin-top: 20px;
            margin-bottom: 20px;
        }
        .testimonial-signature {
            float: right;
            font-style: italic;
            font-weight: bold;
        }
        </style>
        """

    st.markdown(f"""
        {customer_feedback_card_style}
        <div class="center">
            <div class="card">
                <img class="card-logo" src="data:image/png;base64,{huofu_logo}" style="width:40%">
                <div class="container">
                    <p>"对于我们管理的店铺，每天产生的客户评价有数千条，如果想看完至少要3个小时以上，
                    我们根本不可能投入这么长时间，所以也往往错失从客户反馈中发现问题的机会。
                    而借助这个工具我们可以在10分钟内了解主销商品的客户评价内容。"</p>
                    <span class="testimonial-signature">火蝠电商 KA Operation Director</span>
                </div>
            </div>
            <div class="card">
                <img class="card-logo" src="data:image/png;base64,{teatree_logo}" style="width:40%">
                <div class="container">
                    <p>"洞见评价帮产品研发部门高效地理解客户对于我们产品的反馈，找到客户痛点和需求，明确了产品优化方向 ... 
                    我们的生产部还通过定制分析功能快速掌握了品控问题。这个工具的价值在于让非电商部门也开始关注用户声音，听取用户反馈。"</p>
                    <span class="testimonial-signature">一棵茶树 Sales Vice President</span>
                </div>
            </div>
        </div>
        """, unsafe_allow_html=True)

        

    # TODO: Finish CTA page switch buttons
    # --- CTA 1: Try It Yourself ---
    # if st.button('Go to Page 2'):
    #     st.session_state['menu_option'] = "体验"
    #     top_menu = "体验"
    # if st.button("🚀 立即体验 🚀", key="function_button"):
    #     top_menu = "体验"
    # --- CTA 2: Learn Our Pricing ---