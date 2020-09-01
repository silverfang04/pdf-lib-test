const express=require('express')
const fs=require('fs')
const { PDFDocument } =require('pdf-lib')

const app=express()

app.get('/',async(req,res)=>{
    let pdf=fs.readFileSync('../doc.pdf');
    const pdfDoc = await PDFDocument.load(pdf)
    const pages = pdfDoc.getPages()
    const firstPage = pages[0]
    const { width, height } = firstPage.getSize()
    firstPage.drawText('This text was added with JavaScript!', {
        x: 5,
        y: height / 2 + 300,
        size: 50,
    })
    const pdfBytes = await pdfDoc.save()
    res.setHeader('Content-Type', 'application/pdf');
    res.send(Buffer.from(pdfBytes, 'binary'))
})


app.listen(3000,()=>{
    console.log('server up')
})