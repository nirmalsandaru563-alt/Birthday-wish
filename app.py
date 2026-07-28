import streamlit as st
import streamlit.components.v1 as components

st.set_page_config(page_title="Interactive Birthday Wish", layout="wide")

with open("index.html", "r") as f:
    html_string = f.read()

with open("style.css", "r") as f:
    css_string = f.read()

with open("script.js", "r") as f:
    js_string = f.read()

complete_html = f"""
<!DOCTYPE html>
<html>
<head>
    <style>{css_string}</style>
</head>
<body>
    {html_string.split('<body>')[1].split('</body>')[0]}
    <script>{js_string}</script>
</body>
</html>
"""

components.html(complete_html, height=750, scrolling=False)
