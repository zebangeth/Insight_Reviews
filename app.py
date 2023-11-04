import random
import time

import streamlit as st
from streamlit_option_menu import option_menu

from configs import CONTENT_COL_CONFIG
from app_pages.home import show_home_page
from app_pages.function import show_function_page
from app_pages.pricing import show_pricing_page
from app_pages.info import show_info_page

# --- PAGE CONFIG AND NAV SESSION STATE---
st.set_page_config(page_title="Insightful Reviews", page_icon="⛳️", layout="wide")

if 'menu_option' not in st.session_state:
    st.session_state['menu_option'] = 'Home'

lang_choice = st.sidebar.selectbox('Choose your language', options=['English (beta)', '简体中文'])

language = "zh" if lang_choice == '简体中文' else "en"

# https://github.com/victoryhb/streamlit-option-menu
# https://icons.getbootstrap.com/
menu_options = {
    "en": [
        {"label": "Home", "icon": "house"},
        {"label": "Try", "icon": "rocket"},
        {"label": "Price", "icon": "credit-card"},
        {"label": "Contact", "icon": "info-circle"}
    ], 
    "zh": [
        {"label": "主页", "icon": "house"},
        {"label": "体验", "icon": "rocket"},
        {"label": "定价", "icon": "credit-card"},
        {"label": "信息", "icon": "info-circle"}
    ]
}

top_menu = option_menu(None, [option["label"] for option in menu_options[language]], 
                        icons=[option["icon"] for option in menu_options[language]], 
                        menu_icon="cast", default_index=0, orientation="horizontal", 
                        # styles={
                        #     "container": {"padding": "0!important", "background-color": "#fafafa"},
                        #     "icon": {"color": "orange", "font-size": "25px"}, 
                        #     "nav-link": {"font-size": "25px", "text-align": "left", "margin":"0px", "--hover-color": "#eee"},
                        #     "nav-link-selected": {"background-color": "grey"},
                        # }
                    )

# --- Page Footer ---
def show_page_footers():
    _, center, _ = st.columns(CONTENT_COL_CONFIG)

    with center:
        st.markdown("<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>", unsafe_allow_html=True)
        st.markdown("此网站仅作为正式版应用的功能演示，如有需要请联系我们以获得更多信息")
        st.markdown("""
                    Please note, this web application serves only as a functional demonstration of the official/for-profit version of the e-commerce review analysis application. 
                    For further details or if you are interested in using the application for commercial purposes, do not hesitate to reach out.
                    """)
        st.markdown("© 2023 洞见分析")


if top_menu in ("主页", "Home"): 
    show_home_page(language)

if top_menu in ("体验", "Try"): 
    show_function_page(language)

if top_menu in ("定价", "Price"): 
    show_pricing_page()

if top_menu in ("信息", "Contact"): 
    show_info_page()

show_page_footers()
