# Read and analyze the main HTML file
with open('index.html', 'r', encoding='utf-8') as file:
    content = file.read()

# Display the full content to understand the structure
print("=== MAIN HTML FILE CONTENT ===")
print(content)
print("\n=== END OF FILE ===")
print(f"\nFile length: {len(content)} characters")