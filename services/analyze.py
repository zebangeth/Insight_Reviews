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

def generate_prompt(prod_info, num_of_reviews, review_texts, user_position, analysis_focus):
    common_prompt = f"""
    你是一款极为先进的AI分析工具。你的任务是总结并分析这款 {prod_info} 产品最近的{num_of_reviews}条产品评价。\n
    每条评价都包含评价序号，尖括号中的用户评价，以及花括号中的评价时间。根据这些评价，我需要你提供一个全面、深入的分析。\n
    你的分析结果应该包括总结段落，指出主要发现，以及详细的分析部分，对每个主要发现进行深入探讨。你的分析应该以客观、中立的方式提供，避免任何个人偏见或主观解读。\n
    仅在必要时，你可以对于主要发现给出具体的客户评价作为证据，并注明评价日期。\n
    在分析结束后，请给出一些基于你的发现的建议，以帮助改进产品或提高客户满意度。\n
    """

    focus_to_prompt = {
        "⚙️ 产品功能": "请你从产品功能的角度分析，并给出完整的分析总结。",
        "💎 产品质量": "请你从产品质量的角度分析，并给出完整的分析总结。",
        "🎨 产品外观": "请你从产品外观的角度分析，并给出完整的分析总结。",
        "🖐️ 使用体验": "请你从使用体验的角度分析，并给出完整的分析总结。",
        "💰 价格合理性": "请你从价格合理性的角度分析，并给出完整的分析总结。",
        "💳 客户服务与下单体验": "请你从客户服务和下单体验的角度分析，并给出完整的分析总结。",
        "📦 包装与物流": "请你从包装和物流的角度分析，并给出完整的分析总结。",
    }

    position_to_prompt = {
        "👨🏻‍💻 电商运营": "电商运营经理的角度分析，注意任何可能影响产品销量和客户满意度的因素，如产品受欢迎程度、销售策略、定价等，以及客户的反馈和建议。",
        "🤵🏻‍♂️ 电商客服": "客户服务经理的角度分析，重点关注客户对客服服务过程的反馈，如客服服务质量、响应速度、专业性、客户问题、投诉情况等，并给出完整的分析总结。",
        "👩🏻‍🔬 产品研发": "产品研发经理的角度分析，关注客户对产品功能和设计上优缺点的反馈，如产品功能、用户体验、产品优化需求等，并给出完整的分析总结。这将有助于产品的优化和改进。",
        "👩🏻‍🔧 生产/质量控制": "生产和质量控制部门经理的角度分析，请重点关注客户对产品质量的反馈，如产品质量问题、产品瑕疵等，并给出完整的分析总结。",
        "✈️ 物流/供应链": "物流和供应链部门经理的角度分析，请注意客户对产品包装和物流的反馈，如包装物流问题、物流速度和物流体验等，并给出完整的分析总结。",
    }

    # 根据用户的角色来生成不同的 prompt，如果用户同时选择了岗位角色和分析角度，那么优先使用分析角度
    if analysis_focus != "暂不选择":
        prompt = common_prompt + "此次分析，请侧重于" + focus_to_prompt[analysis_focus]
    elif user_position != "暂不选择":
        prompt = common_prompt + "此次分析，请你站在" + position_to_prompt[user_position]
    else:
        prompt = common_prompt + "请你从不同角度全面的对客户评价进行分类总结和分析，如产品的主要优点和缺点、产品的功能、包装、定价、客户对产品的满意度、产品的质量以及任何其他客户反映的问题。"

    prompt += f"\n评价列表：\n```{review_texts}```"
    return prompt