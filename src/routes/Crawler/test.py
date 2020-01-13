#-*- coding: utf-8 -*-

import requests
import json

# with를 이용해 파일을 연다.
# json 파일은 같은 폴더에 있다고 가정!

exhibition = []
dictLatlon = {}

with open('exhibition_address.json', "r", encoding="utf-8") as json_file:
    print(type(json_file))
    print(json_file)
    json_data = json.load(json_file)

    datas = json_data["data"]
    # print(datas)
    for data in datas:
        if data["address"] != "":
            url = "https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query="+data["address"]

            payload = {}
            headers = {
            'X-NCP-APIGW-API-KEY-ID': '07qhy91g3z',
            'X-NCP-APIGW-API-KEY': '1TyVtIEq7EgoSveFrEawvtNCQawQsTRVvPRkK1Ev'
            }

            response = requests.request("GET", url, headers=headers, data = payload)

            # responseData = json.dumps(response.text)
            # responseJson = json.loads(responseData)
            responseJson = eval(response.text)
            # print(data["address"])
            # print(responseJson["addresses"][0]["x"])
            dictLatlon.update({"address":data["address"], "x" : responseJson["addresses"][0]["x"], "y": responseJson["addresses"][0]["y"]})
            exhibition.append(dictLatlon)
            
# print(exhibition)    
with open("latlon.json", "w", encoding = "utf-8") as json_file:
    latlon_data = json.dumps(exhibition)
    json.dump(latlon_data, json_file, ensure_ascii=False)    


    # # 문자열
    # # key가 json_string인 문자열 가져오기
    # json_string = json_data["json_string"]
    # print(json_string)

    # # 숫자
    # # key가 json_number인 숫자 가져오기
    # json_number = json_data["json_number"]
    # print(str(json_number)) # 숫자이기 때문에 str()함수를 이용

    # # 배열
    # # key가 json_array인 배열 가져오기
    # json_array = json_data["json_array"]
    # print(json_array)

    # # 객체
    # # key가 json_object인 객체 가져와서 만들기
    # # json object의 경우에 python ojbect로 바꿀때는 따로 처리를 해줘야합니다.
    # # 기본형은 dictionary입니다.
    # json_object = json_data["data"]
    # print(json_object)

    # # bool형
    # # key가 json_bool인 bool형 자료 가져오기
    # json_bool = json_data["json_bool"]
    # print(json_bool)

url = "https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode?query=서울특별시종로구평창30길25"

payload = {}
headers = {
  'X-NCP-APIGW-API-KEY-ID': '07qhy91g3z',
  'X-NCP-APIGW-API-KEY': '1TyVtIEq7EgoSveFrEawvtNCQawQsTRVvPRkK1Ev'
}

response = requests.request("GET", url, headers=headers, data = payload)

print(response.text.encode('utf8'))