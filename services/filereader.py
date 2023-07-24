import pandas as pd

# 需要使用的列
USEFUL_COLUMNS = [
    'SKU', '首次评价', '首评时间', '首评图片',  
    '追加评价', '追评时间', '追评图片', 
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
        try:
            df = pd.read_excel(self.file)
        except Exception as e:
            return False

        # 检查所有必要的列是否都存在
        for column in USEFUL_COLUMNS:
            if column not in df.columns:
                return False

        return True

    def extract_data(self):
        """
        从文件中提取需要的数据。
        """
        df = pd.read_excel(self.file)

        # 删除无有效内容的评价
        df = df[(df['首次评价'] != EMPTY_REVIEW) & (df['首次评价'].str.len() > 2) | (df['追加评价'].str.contains('\w'))]

        # 只保留有用的列
        df = df[USEFUL_COLUMNS]
        return df

    def df_to_text(self, 
                   columns=['首次评价', '首评时间'], 
                   num_of_reviews=100, 
                   ): # TODO: check if columns need to change here for other 3rd-party browser extension exported files

        df = self.extract_data()

        num_of_valid_reviews = len(df)

        # Fill NaN values with empty strings
        df['首次评价'] = df['首次评价'].fillna('')
        df['追加评价'] = df['追加评价'].fillna('')

        # Create a new column '全部评价' which is the combination of '首次评价' and '追加评价'
        df['全部评价'] = df['首次评价'] + "..." + df['追加评价']

        prod_reviews = df['全部评价'].tolist()
        review_date = df['首评时间'].tolist()

        review_texts = ""
        for i in range(min(num_of_reviews, num_of_valid_reviews)):
            review_texts += (
                str(i + 1) + ". "
                + "{" + review_date[i] + "} "
                + "<" + prod_reviews[i] + "> "
                + "\n"
            )
        
        return review_texts, num_of_valid_reviews