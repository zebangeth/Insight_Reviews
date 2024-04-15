import os
import pathlib
import streamlit as st
from configs import CONTENT_COL_CONFIG

# --------------------------------------------------------------------------------
# ---- INFO PAGE -----------------------------------------------------------------
# --------------------------------------------------------------------------------

def show_info_page():
    
    contact_form_style = """
    <style>
    .contact-form-container {
        max-width: 800px;
        margin: auto;
    }
    /* Style inputs with type="text", type="email"and textareas */
    input[type=text], input[type=email], textarea {
        width: 100%; /* Full width */
        padding: 12px; /* Some padding */
        border: 1px solid #ccc; /* Gray border */
        border-radius: 4px; /* Rounded borders */
        box-sizing: border-box; /* Make sure that padding and width stays in place */
        margin-top: 6px; /* Add a top margin */
        margin-bottom: 16px; /* Bottom margin */
        resize: vertical /* Allow the user to vertically resize the textarea (not horizontally) */
    }
    /* Style the submit button with a specific background color etc */
    button[type=submit] {
        background-color: #166088;
        color: white;
        padding: 12px 20px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
    }
    /* When moving the mouse over the submit button, add a darker green color */
    button[type=submit]:hover {
        background-color: #3299d1;
    }
    </style>
    """

    contact_form = f"""
    {contact_form_style}
    <div class="contact-form-container">
        <h3>📨 如果您有任何想法或问题,欢迎在此处留言</h3>
        <p>我会在第一时间与您进行联系</p>
        <form action="https://formsubmit.co/{st.secrets["EMAIL_ADDRESS"]}" method="POST">
            <input type="hidden" name="_captcha" value="false">
            <input type="text" name="name" placeholder="您的称呼" required>
            <input type="email" name="email" placeholder="您的邮箱 example@xyz.com" required>
            <textarea name="message" placeholder="请在这里留下您的想法或问题"></textarea>
            <button type="submit">点击发送</button>
        </form>
    </div>
    """

    st.markdown(contact_form, unsafe_allow_html=True)