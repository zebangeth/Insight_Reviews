import os
import pathlib

import streamlit as st

from configs import CONTENT_COL_CONFIG

# --------------------------------------------------------------------------------
# ---- INFO PAGE -----------------------------------------------------------------
# --------------------------------------------------------------------------------

def show_info_page():

    _, center, _ = st.columns(CONTENT_COL_CONFIG)

    with center: 
        # st.subheader("Welcome to Insightful Reviews ⛳️")
        # st.title("Insightful Reviews for Every Role")
        # st.title("🚧 这个页面正在施工 👨🏻‍🔧🧱🛠️🔩")
        # st.title("请稍后再来 🧸")
        # st.markdown("---")
        # st.title("🚧 This Page is Under Maintenance 👨🏻‍🔧🧱🛠️🔩")
        # st.title("Pleace Come Later 🧸")
        # st.markdown("---")


        st.markdown("#### 📨 如果您有任何想法或问题，欢迎在此处留言")
        st.markdown("> 我会在第一时间与您进行联系")

        contact_form = f"""
        <form action="https://formsubmit.co/{st.secrets["EMAIL_ADDRESS"]}" method="POST">
            <input type="hidden" name="_captcha" value="false">
            <input type="text" name="name" placeholder="您的称呼" required>
            <input type="email" name="email" placeholder="您的邮箱 example@xyz.com" required>
            <textarea name="message" placeholder="请在这里留下您的想法或问题"></textarea>
            <button type="submit">点击发送</button>
        </form>
        """

        st.markdown(contact_form, unsafe_allow_html=True)

        def local_css(file_name):
            current_file_path = pathlib.Path(__file__).resolve()
            project_root = current_file_path.parent.parent
            css_file_path = project_root / file_name
            with open(css_file_path) as f:
                st.markdown(f"<style>{f.read()}</style>", unsafe_allow_html=True)

        local_css("style/inmail_style.css")