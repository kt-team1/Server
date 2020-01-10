#!/usr/bin/env python
# coding: utf-8

# In[2]:


import requests
from bs4 import BeautifulSoup
import json


# In[3]:


url = 'https://m.search.naver.com/p/csearch/content/qapirender.nhn?'


# In[4]:


title = []

for i in range(1, 164, 6):
    params = {
            'where':'nexearch',
            'key':'onGoingExhibitions',
            'q' : '서울전시회',
            'start' : i,
        }
    
    json_string = requests.get(url, params).text
    data_list = json.loads(json_string)
    data_list = data_list['listView']['htmls']
    
    for data in data_list:
        soup = BeautifulSoup(data, 'lxml')
        temp = soup.select('dd a')[0]
#         print(temp)
        for i in range(len(temp)):
            title.append(temp.text)

title = set(title)
print(len(title))
print(title)


# In[5]:


url = "https://search.naver.com/search.naver"


# In[6]:


exhibition = []
location = []

for keyword in title:
    params = {
    'query' : keyword
    }
    
    resp = requests.get(url, params)
    soup = BeautifulSoup(resp.content, 'lxml')
    content = soup.find('div', class_ = 'contents03_sub')
    if (content != None and content.find('h4', class_ = "detail_title") != None):
        dt_list = content.select('dl.item_list dt')
        dd_list = content.select('dl.item_list dd')
    
        temp_title = content.find('h4', class_ = "detail_title").find('a').text
        temp_poster = content.find('div', class_ = "img_box").find('img')['src']
    
        temp_period = None
        temp_time = None 
        temp_location = None
        temp_host = None 
        temp_price = None

        for i in range(len(dt_list)):
            if dt_list[i].text == '기간':
                temp_period = dd_list[i].text
            if dt_list[i].text == '시간':
                temp_time = dd_list[i].text
            if dt_list[i].text == '장소':
                temp_location = dd_list[i].find('a').text
            if dt_list[i].text == '주최':
                temp_host = dd_list[i].text
            if dt_list[i].text == '요금':
                temp_price = dd_list[i].text

        temp = {
            'title': temp_title,
            'period': temp_period,
            'time': temp_time, 
            'loc': temp_location, 
            'host': temp_host,
            'price': temp_price,
            'poster': temp_poster
        }

        exhibition.append(temp)
        location.append(temp_location)
        
exhibition


# In[7]:


count = 0
print(len(exhibition))
for exhib in exhibition:
    print("\ncount: ", count)
    print("title: ", exhib['title'])
    print("period: ", exhib['period'])
    print("time: ", exhib['time'])
    print("location: ", exhib['loc'])
    print("host: ", exhib['host'])
    print("price: ", exhib['price'])
    print("poster_url: ", exhib['poster'])
    print("\n")
    count += 1


# In[8]:


location_set = set(location)
location_set
print(len(location_set))


# In[9]:


address = []
url = 'https://map.naver.com/v5/api/search'
# https://map.naver.com/v5/search/%EC%84%9C%EC%9A%B8%EC%8B%9C%EB%A6%BD%EB%AF%B8%EC%88%A0%EA%B4%80?c=14133724.2115743,4518044.4291165,14,0,0,0,dh

for loc in location_set:
    
    params = {
    'query' : loc
    }

    
    json_string = requests.get(url, params).text
    data_list = json.loads(json_string)
    
    print(loc)
    
    try:
        temp_addr = data_list['result']['place']['list'][0]['roadAddress']
    
        temp = {
            'location': loc,
            'address': temp_addr
        }
        
        address.append(temp)
        
    except TypeError:
        continue


# In[10]:


len(address)

count = 0
for addr in address:
    print("\ncount: ", count)
    print("location: ", addr['location'])
    print("address: ", addr['address'])
    print("\n")
    count += 1


# In[11]:


jsonDict_1 = {'data': exhibition}
with open('./routes/Crawler/exhibition.json', 'w', encoding='utf-8') as f:
    json.dump(jsonDict_1, f, ensure_ascii=False)


# In[12]:


jsonDict_2 = {'data': address}
with open('./routes/Crawler/exhibition_address.json', 'w', encoding='utf-8') as f:
    json.dump(jsonDict_2, f, ensure_ascii=False)


# In[ ]:




