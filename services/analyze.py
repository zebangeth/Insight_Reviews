import os

import openai
import streamlit as st

# from dotenv import load_dotenv, find_dotenv
# _ = load_dotenv(find_dotenv()) # read local .env file

# openai.api_key  = os.getenv('OPENAI_API_KEY')

openai.api_key  = st.secrets["OpenAI_API_KEY"]

def get_completion(prompt, model="gpt-3.5-turbo"):
    messages = [{"role": "user", "content": prompt}]
    response = openai.ChatCompletion.create(
        model=model, 
        messages=messages, 
        temperature=0.5,
    )
    return response.choices[0].message["content"]

def generate_prompt(prod_info, num_of_reviews, review_texts):
    prompt = f"""
    你的任务是总结并分析这款{prod_info}最近的{num_of_reviews}条产品评价。
    具体的{num_of_reviews}条产品评价已经按照时间由近到远整理在下面的评价列表中，
    评价列表中的每条内容包含评价序号，尖括号中的用户评价，和花括号中的评价时间。
    请你从不同角度对客户评价进行分类总结和分析，如产品、包装、定价等。并给出完整的分析总结。

    评价列表：```{review_texts}```
    """
    return prompt

# response = get_completion(prompt)
# print(response)

# prompt = f"""
# 你的任务是总结并分析这款{prod_info}最近的{num_of_review}条产品评价。
# 具体的产品评价已经按照时间由近到远整理在下面的评价列表中，
# 评价列表中的每条内容包含评价序号，花括号中的评价时间，和尖括号中的用户评价。

# 请在分析中注意：
# 1. 首先总结这{num_of_review}条产品评价的时间跨度；其中多少条无实际内容的无效评价；有效评价中多少条正面评价，多少条负面评价。
# 2. 从不同角度对客户评价进行分类总结和分析，如产品、包装、定价等。
# 3. 根据客户的评价时间，分析产品口碑在过去这段时间是否有显著变化。

# 评价列表：```{all_reviews}```
# """

# response = get_completion(prompt)
# print(response)
