import pandas as pd

# 需要使用的列
USEFUL_COLUMNS = [
    'SKU', '旺旺号', '首次评价', '首评时间', '首评图片', '商家首次回复', 
    '追加评价', '追评时间', '追评图片', '商家追加回复'
    ]
# 无内容评价
EMPTY_REVIEW = "此用户没有填写评价。"

class FileReader: 
    def __init__(self, file) -> None:
        self.file = file

    def check_file(self):
        """
        check if file is valid and contains all required review columns
        """
        # 尝试读取文件
        try:
            df = pd.read_excel(self.file)
        except Exception as e:
            return False

        # 检查所有必要的列是否都存在
        for column in USEFUL_COLUMNS:
            if column not in df.columns:
                return False

        return True

    def extract_data(self, file):
        """
        从文件中提取需要的数据。
        """
        df = pd.read_excel(file)

        # 删除无内容评价
        df = df[df['首次评价'] != EMPTY_REVIEW]
        df = df[df['追加评价'] != EMPTY_REVIEW]

        # 只保留有用的列
        df = df[USEFUL_COLUMNS]
        # print(df)
        return df

    def df_to_text(self, 
                   extract=True, 
                   columns=['首次评价', '首评时间'], 
                   num_of_reviews=100, 
                   ): # TODO: check if columns need to change here

        if extract: 
            df = self.extract_data(self.file)
        else: 
            df = pd.read_excel(self.file)
        prod_reviews = df['首次评价'].tolist()
        review_date = df['首评时间'].tolist()

        review_texts = ""
        for i in range(min(num_of_reviews, len(prod_reviews))):
            review_texts += (
                str(i + 1) + ". "
                + "{" + review_date[i] + "} "
                + "<" + prod_reviews[i] + "> "
                + "\n"
            )
        
        return review_texts