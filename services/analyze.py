import os

import openai
import streamlit as st

# from dotenv import load_dotenv, find_dotenv
# _ = load_dotenv(find_dotenv()) # read local .env file

# openai.api_key  = os.getenv('OPENAI_API_KEY')

openai.api_key  = st.secrets["OpenAI_API_KEY"]

def get_completion(prompt, model="gpt-3.5-turbo-16k-0613"):
    messages = [{"role": "user", "content": prompt}]
    response = openai.ChatCompletion.create(
        model=model, 
        messages=messages, 
        temperature=0.8,
    )
    return response.choices[0].message["content"]

def generate_prompt(prod_info, num_of_reviews, review_texts, user_position, analysis_focus):
    common_prompt_part1 = f"""
    你是一款先进的AI分析工具。你的任务是总结并分析这款 {prod_info} 产品最近的{num_of_reviews}条产品评价。\n
    """

    common_prompt_part2 = f"""
    每条评价都包含评价序号，尖括号中的用户评价，以及花括号中的评价时间。\n
    你的分析结果应该包括总结段落，指出主要发现，以及详细的分析部分，对每个主要发现进行深入探讨。\n
    你的分析应该以客观、中立的方式提供，避免主观解读。\n
    仅在必要时，你可以对于主要发现给出具体的客户评价作为证据，并注明评价日期。\n
    在分析结束后，请给出一些基于你的发现的建议，以帮助提高客户满意度或进一步提高。\n
    请以 markown 格式输出你的分析结果。
    """
    
    focus_to_prompt = {
        "⚙️ 产品功能": "产品的功能特性，如：产品的主要功能，功能的实用性以及客户对功能的反应。",
        "💎 产品质量": "探讨产品的质量问题，如：产品的耐用性，质量稳定性，以及客户对产品质量的反馈。",
        "🎨 产品外观": "产品的外观设计，如：产品的外观、颜色，形状，尺寸，以及客户对外观设计的反馈。",
        "🖐️ 使用体验": "客户对产品使用体验的反馈，如：产品的使用便利性，舒适性以及客户在使用过程中遇到的问题。",
        "💰 价格合理性": "探讨产品的价格问题。如：产品的价格是否合理，价格与产品的价值是否匹配，以及客户对产品价格的反馈。",
        "💳 客户服务与下单体验": "客服和下单体验，如：在线客服人员的响应速度，服务质量，客服专业性，下单流程的便利性以及客户的其他反馈。",
        "📦 包装与物流": "产品的包装和物流问题，如：产品的包装是否完好、包装的外观设计、物流速度等，以及客户对包装和物流的反馈。"
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
        prompt = common_prompt_part1 + "此次分析，不需要全面，请仅侧重于" + focus_to_prompt[analysis_focus] + common_prompt_part2
    elif user_position != "暂不选择":
        prompt = common_prompt_part1 + "此次分析，不需要全面，请你仅站在" + position_to_prompt[user_position] + common_prompt_part2
    else:
        prompt = common_prompt_part1 + "请你从不同角度全面的对客户评价进行分类总结和分析，如产品的主要优点和缺点、产品的功能、包装、定价、客户对产品的满意度、产品的质量以及任何其他客户反映的问题。" + common_prompt_part2

    prompt += f"\n评价列表：\n```{review_texts}```"
    return prompt