import os
import csv

def get_png_files(folder_path):
    png_files = []
    for root, dirs, files in os.walk(folder_path):
        for file in files:
            if file.endswith('.png'):
                png_files.append(os.path.join(root, file))
    return png_files

# Path to the main folder containing subdirectories with PNG files
main_folder_path = "./top_5_football_leagues"

# Get all PNG files in subdirectories
png_files = get_png_files(main_folder_path)

# Create the output folder if it doesn't exist
output_folder = "./src"
os.makedirs(output_folder, exist_ok=True)

# Create a CSV file to store the mappings
csv_file_path = os.path.join(output_folder, "filename_mappings.csv")

# Print the list of PNG files for debugging
print("PNG Files:")
print(png_files)

# Open the CSV file in write mode
with open(csv_file_path, 'w', newline='') as csvfile:
    # Create a CSV writer object
    csv_writer = csv.writer(csvfile)
    
    # Write the header to the CSV file
    csv_writer.writerow(['File Name', 'File Path'])
    
    # Iterate through the list of PNG files
    for png_file in png_files:
        # Replace dashes with spaces in the file name
        file_name = os.path.basename(png_file).replace('-', ' ')
        
        # Remove the ".png" extension
        file_name = os.path.splitext(file_name)[0]
        
        # Get the relative path of the PNG file from the current working directory
        file_path = os.path.relpath(png_file, start=os.getcwd())
        
        # Write the modified file name and relative file path to the CSV file
        csv_writer.writerow([file_name, file_path])

print(f"CSV file with filename to relative path mappings (dashes replaced with spaces, .png removed) created at: {csv_file_path}")
