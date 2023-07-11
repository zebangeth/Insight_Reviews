import unittest
from services.filereader import FileReader

class TestFileReader(unittest.TestCase):
    def setUp(self):
        self.file_reader = FileReader('test_file.xlsx')

    def test_check_file(self):
        self.assertTrue(self.file_reader.check_file())
        self.file_reader.file = 'invalid_file.xlsx'
        self.assertFalse(self.file_reader.check_file())

    def test_extract_data(self):
        df = self.file_reader.extract_data('test_file_with_empty_reviews.xlsx')
        self.assertFalse((df['首次评价'] == "此用户没有填写评价。").any())
        self.assertFalse((df['追加评价'] == "此用户没有填写评价。").any())

    def test_df_to_text(self):
        text = self.file_reader.df_to_text()
        self.assertTrue(text.startswith('1. '))
        self.assertTrue('{' in text)
        self.assertTrue('}' in text)
        self.assertTrue('<' in text)
        self.assertTrue('>' in text)

if __name__ == '__main__':
    unittest.main()