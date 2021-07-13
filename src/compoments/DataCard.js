import React, {useEffect, useState} from "react";
import {Card, Divider, Image, Typography} from "antd";
import axios from "axios";

// 只管数据显示，数据筛选后传进来即可
const DataCard = (props) => {
    const cardWidth = 360
    const exprInfo = props.exprInfo;
    const {Meta} = Card;
    // const exprInfo = props.exprInfo;

    const imageList = exprInfo.imgUrlList.map((imgUrl) => {
        return (
            <div key={imgUrl}>
                <Image
                    src={imgUrl}
                    style={{
                        // display: 'none',
                        width: cardWidth - 24 * 2,
                        imageRendering: "-moz-crisp-edges -o-crisp-edges -webkit-optimize-contras crisp-edges",
                    }}
                />
                <br/>
            </div>
        )
    })

    const [exprFull, setExprFull] = useState({});

    useEffect(() => {
        (async () => {
            await axios
                .get("/api/experiment?experimentId=" + exprInfo.id)
                .then(
                    (response) => {
                        // console.log(response.data.data);
                        setExprFull(response.data.data);
                        console.log(response);
                    }
                )
        })()
    }, [])

    if (exprFull.distance != undefined)
        exprInfo.result = exprFull.distance.toFixed(3) + 'm';

    return (
        <Card
            title={"#" + exprInfo.id + "\xa0\xa0\xa0测出的距离：" + exprInfo.result + ""}
            style={{
                width: cardWidth,
                display: "inline-block",
                margin: 12
            }}
            type="inner"
        >
            {/*计算值：{exprInfo.result} 真实值:{exprInfo.std}*/}
            {/*<Divider/>*/}
            {imageList}
            {/*<br/>*/}
            {/*测量值：23.4m*/}
            {/*<br/>*/}
            {/*实际值：12.7m*/}

        </Card>
    );
}

export default DataCard;