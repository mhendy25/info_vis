import os
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse

# URL of the webpage
base_url = 'https://www.sportslogos.net'
league_url = 'teams/list_by_league/161/Veikkausliiga_Finland//logos/'
url = urljoin(base_url, league_url)

# Create a folder to store logos
logos_folder = 'logos'
if not os.path.exists(logos_folder):
    os.makedirs(logos_folder)

# Fetch HTML content of the webpage
response = requests.get(url)
html_content = response.text

# Parse HTML using BeautifulSoup
soup = BeautifulSoup(html_content, 'html.parser')

# Extract logo URLs and corresponding titles
logo_urls = []
titles = []

# First level: Extract links to the next page
for li in soup.select('.logoWall li'):
    a_tag = li.find('a')
    if a_tag and 'title' in a_tag.attrs and 'href' in a_tag.attrs:
        title = a_tag['title'].replace(' Logos', '')  # Remove " Logos" from title
        titles.append(title)
        logo_page_url = urljoin(base_url, a_tag['href'])

        # Second level: Fetch HTML content of the second level page
        logo_page_response = requests.get(logo_page_url)
        logo_page_soup = BeautifulSoup(logo_page_response.text, 'html.parser')

        for li in logo_page_soup.select('.logoWall li'):
            a_tag = li.find('a')
            # print(a_tag)
            if a_tag and ("Pres" in a_tag.text) and 'href' in a_tag.attrs:
                # titles.append(title)
                # print(a_tag.text)
                # print(a_tag['href'])
                logo_page_url = urljoin(base_url, a_tag['href'])
                    
                logo_page_new_response = requests.get(logo_page_url)
                logo_page_new_soup = BeautifulSoup(logo_page_new_response.text, 'html.parser')
                # Third level: Extract the logo URL from the third level page

                main_logo_div = logo_page_new_soup.find(id='body').find(class_ = 'content').find(class_ ='section').find(class_ = 'mainLogo')
                
                # main_logo_div = logo_page_new_soup.find('div', {'id': 'mainLogo'}
                #                                         )
                # print(main_logo_div)
                
                if main_logo_div:
                    logo_img = main_logo_div.find('img', {'title': lambda x: x and 'Pres' in x})
                    if logo_img and 'src' in logo_img.attrs:
                        # print(logo_img['src'])
                        # logo_path = urlparse(logo_img['src']).path
                        logo_urls.append(logo_img['src'])

# Download logos
for title, logo_url in zip(titles, logo_urls):
    # response = requests.get(logo_url)
    headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'}

    response = requests.get(logo_url, allow_redirects=True, headers=headers)

    print(logo_url)


    print(f"Status code for {title}: {response.status_code}")  # Print 

    if response.status_code == 200:
        logo_filename = os.path.join(logos_folder, f'{title}.png')
        with open(logo_filename, 'wb') as logo_file:
            logo_file.write(response.content)
        print(f'Downloaded: {logo_filename}')
    else:
        print(f'Failed to download: {title}')

print('All logos downloaded successfully.')
