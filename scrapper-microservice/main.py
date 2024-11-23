import os
import git
import shutil


repo_url = "https://github.com/juice-shop/juice-shop.git" 
local_dir = "temp_repo" 
output_file = "all_code.txt"


code_extensions = {".py", ".java", ".cpp", ".js", ".ts", ".html", ".css"}

def clone_repo(repo_url, local_dir):
    if os.path.exists(local_dir):
        shutil.rmtree(local_dir)  
    git.Repo.clone_from(repo_url, local_dir)

def process_files(directory, output_file):
    with open(output_file, "w", encoding="utf-8") as out:
        for root, _, files in os.walk(directory):
            for file in files:
                file_path = os.path.join(root, file)
                if os.path.splitext(file)[1] in code_extensions:
                    with open(file_path, "r", encoding="utf-8") as f:
                        content = f.read()
                        relative_path = os.path.relpath(file_path, directory)
                        out.write(f"##{relative_path} start##\n")
                        out.write(content)
                        out.write(f"\n##{relative_path} end##\n\n")

def main(repo_url, local_dir, output_file):
    try:
        print("clon the repo")
        clone_repo(repo_url, local_dir)
        print("File processing...")
        process_files(local_dir, output_file)
        print(f"Saved to {output_file}")
    finally:
        if os.path.exists(local_dir):
            shutil.rmtree(local_dir)
            print("tmp repo is deleted")

main(repo_url, local_dir, output_file)
