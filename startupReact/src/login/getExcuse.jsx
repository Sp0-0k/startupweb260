import React from 'react';

export async function GetExcuse(){
    const r = await fetch("https://excuser-three.vercel.app/v1/excuse/family")
    const j = await r.json()
    alert(j[0].excuse)
}