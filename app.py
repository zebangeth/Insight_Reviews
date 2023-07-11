import random
import time

import streamlit as st
from streamlit_option_menu import option_menu

from app_pages.home import show_home_page
from app_pages.function import show_function_page
from app_pages.pricing import show_pricing_page
from app_pages.info import show_info_page

# --- PAGE CONFIG AND NAV SESSION STATE---
st.set_page_config(page_title="Insightful Reviews", page_icon="⛳️", layout="wide")

if 'menu_option' not in st.session_state:
    st.session_state['menu_option'] = 'Home'

# https://github.com/victoryhb/streamlit-option-menu
# https://icons.getbootstrap.com/
menu_options = [
    {"label": "主页", "icon": "house"},
    {"label": "体验", "icon": "rocket"},
    {"label": "定价", "icon": "credit-card"},
    {"label": "信息", "icon": "info-circle"}
]

top_menu = option_menu(None, [option["label"] for option in menu_options], 
                        icons=[option["icon"] for option in menu_options], 
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
    st.markdown("<br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>", unsafe_allow_html=True)
    st.markdown("此网站仅作为正式版应用的功能演示，如有需要请联系我们以获得更多信息")
    st.markdown("""
                This website serves only as a functional demonstration of the official version of the application.  
                Please contact us for more information if you are interested.
                """)
    st.markdown("© 2023 洞见分析")


if top_menu == "主页": 
    show_home_page()
    show_page_footers()

if top_menu == "体验": 
    show_function_page()
    show_page_footers()

if top_menu == "定价": 
    show_pricing_page()
    show_page_footers()

if top_menu == "信息": 
    show_info_page()
    show_page_footers()


