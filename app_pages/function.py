import streamlit as st

from services import analyze
from configs import ANALYSIS_FOCUS, NUM_OF_REVIEWS, USER_POSITION, CONTENT_COL_CONFIG
from services.filereader import FileReader
from style.color_theme import html_header_color_1

# --------------------------------------------------------------------------------
# ---- FUNCTION PAGE -------------------------------------------------------------
# --------------------------------------------------------------------------------

def show_function_page():
    _, center, _ = st.columns(CONTENT_COL_CONFIG)

    with center:
        st.markdown(f"<h2 style='text-align: center; color: {html_header_color_1};'>🚀 简单 3 步，即刻体验 🚀</h2>", unsafe_allow_html=True)
        st.markdown("<h6 style='text-align: center; color: grey;'>无需登录</br>No Login Required</h6>", unsafe_allow_html=True)
        step1_block = st.container()
        st.write("---")
        step2_block = st.container()
        st.write("---")
        step3_block = st.container()
        
        # --- STEP1: File Preperation Instruction ---
        with step1_block:
            
            st.markdown(f"<h4 style='color: {html_header_color_1};'>第 1 步：从电商平台导出评价列表</h4>", unsafe_allow_html=True)
            st.write("请在分析前准备好导出的 .xlsx 评价列表文件")

            review_download_instruction = st.expander("如何将电商平台的评价导出为 .xlsx 文件")

            with review_download_instruction: 
                st.write("许多你熟悉的网页插件都可以将电商网站的产品评价导出，我们支持几乎所有主流插件，无论是小旺神、店透视，还是阿明工具，都不在话下")
                st.image(image="assets/Compatible_Browswer_Extensions.png")
                st.write("你可以选择使用你最喜欢的插件导出评价列表，请只管点击上传，无需担心适配问题")
                st.write("在导出时请选择 .xlsx 格式（.csv 和 .xls 格式的适配正在开发中，敬请期待）")

        # --- STEP2: File Upload and Validation Check ---
        with step2_block:
            st.markdown(f"<h4 style='color: {html_header_color_1};'>第 2 步：上传导出的评价列表</h4>", unsafe_allow_html=True)

            step2_col2, step2_col1 = st.columns((2, 4))

            # 文件上传及合法性检验
            with step2_col1: 
                uploaded_file = st.file_uploader(label="直接拖拽或点击即可上传本地文件", type="xlsx")
                filereader = FileReader(uploaded_file)
                file_valid = filereader.check_file()

            with step2_col2: 
                st.markdown("##### 请在右边上传评价列表👉")
                st.markdown("""<h6 style='color: grey; line-height: 2;'>
                ✅ 使用 .xlsx 格式</br>
                ✅ 上传原始文件，请勿修改内容</h6>
                """, unsafe_allow_html=True)

            if uploaded_file is None:
                st.warning("请先上传包含评价列表的表格文件")
            else:
                if file_valid:
                    st.success("文件上传成功！")
                else:
                    st.error("文件出错。请确保您上传的是一个包含评价内容的有效问价")

        # --- STEP3: Analysis Options ---
        with step3_block:
            st.markdown(f"<h4 style='color: {html_header_color_1};'>第 3 步：选择分析维度，开始分析 🚀</h4>", unsafe_allow_html=True)

            st.markdown("<h6>输入产品信息及您期待的分析侧重点，得到更有针对性的分析结果</h6>", unsafe_allow_html=True)
            step3a_col1, step3a_col2, step3a_col3 = st.columns((4, 2, 2))
            with step3a_col1:
                prod_info = st.text_input("请输入产品类别", placeholder="如：电动牙刷、婴幼儿奶粉、女式连衣裙...")
            with step3a_col2: 
                selected_position = st.selectbox("请选择您的岗位类型", USER_POSITION)
            with step3a_col3: 
                selected_focus = st.selectbox("请选择您的总结侧重点", ANALYSIS_FOCUS)
            
            # 高级分析选项
            advanced_options = st.expander("其他分析选项（非必填）")

            with advanced_options: 
                st.markdown("<h6>请选择需要分析的评价时间范围</h6>", unsafe_allow_html=True)
                step3b_col1, step3b_col2 = st.columns((1, 1))
                with step3b_col1:
                    start_date = st.date_input("开始日期")
                with step3b_col2: 
                    end_date = st.date_input("结束日期")
            
        # --- Analysis Activation and Result ---
        if uploaded_file is not None and file_valid:
            if st.button("开始分析"):
                st.write("---")
                st.header("分析结果")

                analyze_result = st.empty()
                
                with analyze_result: 
                    st.markdown("分析结果正在生成...请等待约15秒钟")

                    review_texts = filereader.df_to_text(extract=True, num_of_reviews=NUM_OF_REVIEWS)
                    prompt = analyze.generate_prompt(prod_info, NUM_OF_REVIEWS, review_texts, selected_position, selected_focus)
                    st.markdown(analyze.get_completion(prompt))