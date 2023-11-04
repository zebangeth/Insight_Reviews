import random
import time
import json

import streamlit as st

from configs import ANALYSIS_FOCUS, CONTENT_COL_CONFIG, USER_POSITION
from style.color_theme import html_header_color_1
from utils.image_loader import img_to_bytes, img_to_html

# --------------------------------------------------------------------------------
# ---- HOME PAGE -----------------------------------------------------------------
# --------------------------------------------------------------------------------

# multi-lingual JSON dictionary
with open('app_pages/home_lang.json', 'r', encoding='utf-8') as f:
    texts = json.load(f)
 
def show_home_page(language):

    INSIGHTFUL_REVIEWS = texts['insightful_reviews'][language]

    _, center, _ = st.columns(CONTENT_COL_CONFIG)

    with center: 
        st.markdown(f"## {texts['welcome'][language]}")
        
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


    # --- Feature 1: Time Saving ---
    st.markdown(f"""<h2 style='text-align: center; color: {html_header_color_1};'>
                {texts['time_saving_subtitle'][language]}</h2>
                """, unsafe_allow_html=True)
    st.markdown(f"""<h3 style='text-align: center; line-height: 2;'>
                {texts['time_saving_description'][language]}</h3>
                """, unsafe_allow_html=True)
    #TODO: 加一个 powered by Langchain, OpenAI, Huggingface 的图片 st.image()

    _, center, _ = st.columns(CONTENT_COL_CONFIG)
    with center: 
        st.markdown("---")


    # --- Feature 2: Tailored Insights ---
    st.markdown(f"""<h2 style='text-align: center; color: {html_header_color_1};'>
                {texts['tailored_insights_subtitle'][language]}</h2>""", 
                unsafe_allow_html=True)
    rolling_content = st.empty()
    with rolling_content: 
        for i in range(8): 
            random_position = USER_POSITION[language][random.randint(1, len(USER_POSITION[language]) - 1)]
            random_focus = ANALYSIS_FOCUS[language][random.randint(1, len(ANALYSIS_FOCUS[language]) - 1)]
            position_focus_message = texts['position_and_focus'][language].format(random_position, random_focus)
            tailored_insights_final_message = {
                "en": texts['position_and_focus'][language].format("👩🏻‍🚀any position", "🌟any aspect"), 
                "zh": texts['position_and_focus'][language].format("👩🏻‍🚀任何岗位", "🌟任何方面"), 
            }
            st.markdown(f"""<h3 style='text-align: center; line-height: 2;'>
                        {position_focus_message}
                        </h3>""", unsafe_allow_html=True)
            time.sleep(0.4)
        st.markdown(f"""<h3 style='text-align: center; line-height: 2;'>
                    {tailored_insights_final_message[language]}
                    </h3>""", unsafe_allow_html=True)

    _, center, _ = st.columns(CONTENT_COL_CONFIG)
    with center: 
        st.markdown("---")


    # --- Feature 3: Compatible with All Major EC Platforms ---
    st.markdown(f"""<h2 style='text-align: center; color: {html_header_color_1};'>
                {texts['ecommerce_compatibility_subtitle'][language]}</h2>
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
                    {texts['customer_feedback_subtitle'][language]}
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
                    <p>{texts['hotfor_feedback'][language]}</p>
                    <span class="testimonial-signature">{texts['hotfor_company_name'][language]}, KA Operation Director</span>
                </div>
            </div>
            <div class="card">
                <img class="card-logo" src="data:image/png;base64,{teatree_logo}" style="width:40%">
                <div class="container">
                    <p>{texts['teatree_feedback'][language]}</p>
                    <span class="testimonial-signature">{texts['teatree_company_name'][language]}, Sales Vice President</span>
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