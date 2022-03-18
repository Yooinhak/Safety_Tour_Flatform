import React, {useState, useEffect} from 'react'
import axios from 'axios'

const KAKAO_API_KEY = '87bb3dde6f868e35e0a4f64884ba2c87'

// 좌표 to 법정동
export default function KakaoService(x, y) {

    const [locCode, setLocCode] = useState(0)

    useEffect(() => {
        axios.get(`https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${x}&y=${y}`,{
            headers: {
                Authorization : 'KakaoAK ' + KAKAO_API_KEY
            }
        }).then((response) => {
            response.data.documents.map((doc) => {
                if(doc.region_type === "B") {
                    setLocCode(doc.code)
                }
            })
        }).catch((e) => {
            console.log(e)
            return 0
        })
    }, [x, y])

    return locCode
}