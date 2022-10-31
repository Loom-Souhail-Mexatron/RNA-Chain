function setup() {
  createCanvas(1200, 400);
  unit0 = 50;
  textOffset = unit0/4
}

function draw() {
  background(255);
  fill(0)
  //ribophos(100,100,unit0)
  //base_AG(170,145,unit0,0);
  /*ribophosBASE_AG(120,100,unit0,1)
  ribophosBASE_AG(280,100,unit0,0)*/
  doubletRPB_AG(720,100)
  //base_CU(80,170,unit0,0);
  /*ribophosBASE_CU(150,100,unit0,0)
  ribophosBASE_CU(360,100,unit0,1)*/
  doubletRPB_CU(180,100)
}

function doubletRPB_AG(x,y){
  ribophosBASE_AG(x,y,unit0,0)
  ribophosBASE_AG(x+(160*unit0)/30,y,unit0,1)
}

function doubletRPB_CU(x,y){
  ribophosBASE_CU(x,y,unit0,1)
  ribophosBASE_CU(x+(215*unit0)/40,y,unit0,0)
}

function ribophosBASE_CU(x,y,radius,isC){
  ribophos(x,y,radius)
  base_CU(x-(104/3*unit0)/40,y+(87*unit0)/40,radius,isC)
}

function ribophosBASE_AG(x,y,radius,isA){
  ribophos(x,y,radius);
  base_AG(x-(7*unit0)/40,y+(145*unit0)/40,radius,isA)
}

function regpoly(x, y, radius, npoints,ang) {
  let angle = TWO_PI / npoints;
  beginShape();
  stroke(0)
  strokeWeight(1);
  fill(0,50,255,30);
  for (let a = ang; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

function linesTriangle(x0,y0,x1,y1,x2,y2){
  for(let j = 0; j < 1; j+= 1/5){
    xM = x1 + j*(x0-x1)
    yM = y1 + j*(y0-y1)
    xN = x2 + j*(x0-x2)
    yN = y2 + j*(y0-y2)
    line(xM, yM, xN, yN)
  }
}

function ribose(x, y, radius) {
  let angle = TWO_PI / 5;
  beginShape();
  noFill();
  textSize(textOffset);
  let i = 0;
  for (let a = 1/3; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius;
    let sy = y + sin(a) * radius;
    vertex(sx, sy);
    fill(0,0,0);
    if(i==1) linesTriangle(sx,sy,sx+radius/10,sy+radius/2,sx-radius/10,sy+radius/2)
    if(i==2){
      triangle(sx,sy,sx-radius/2,sy+radius/10,sx-radius/2+radius/10,sy+radius/3)
      text("HO",sx-radius+radius/10,sy+radius/3)
      text("2'",sx+radius/10,sy)
    }
    if(i==3){
      triangle(sx,sy,sx-radius*5/7,sy-radius/10,sx-radius*6/7+radius/10,sy+radius/2-radius/4)
      //text("O",sx-radius*2/3,sy-radius/6)
      text("3'",sx,sy-radius/7)
    }
    if(i==4){
      linesTriangle(sx,sy,sx+radius/2,sy-radius/2, sx+radius*8/13, sy-radius/3)
      text("5'",sx+radius*2/3,sy-radius*5/9)
      let midX = (sx+radius/2+sx+radius*2/3)/2;
      let midY = (sy-radius/2+ sy-radius/3)/2
      line(midX,midY,midX+radius/2,midY + radius/4)
    }
    noFill();
    i++;
  }
  endShape(CLOSE);
  fill(255)
  noStroke();
  
  Oa = 1/3;
  Ox = (x + cos(Oa) * radius)+textOffset/3;
  Oy = (y + sin(Oa) * radius)-textOffset/2;
  
  rect(Ox,Oy, -textOffset, textOffset)
  fill(0)
  stroke(0);
  text('O',Ox-textOffset,Oy+textOffset)
}

function phosphorous(x,y,radius){
  textSize(textOffset)
  for(let a = 0; a <= TWO_PI; a += PI/2){
    sx = x-cos(a)*radius;
    sy = y-sin(a)*radius;
    text("O", sx, sy)
    if(a == 0){
      line(x,y-textOffset,x,y-radius*5/7-textOffset)
      line(x+radius/6,y-textOffset,x+radius/6,y-radius*5/7-textOffset)
    }
    if(a>PI/2) line(x+radius/10,y-radius/10,sx+radius/10,sy-radius/10)
    if(a==PI*3/2) text("-",sx+textOffset*8/7,sy-textOffset/2)
  }
  fill(0)
  noStroke();
  fill(255)
  rect(x-textOffset/5, y+textOffset/5, textOffset,-textOffset)
  stroke(0);
  fill(0)
  text("P",x,y)
}

function ribophos(x,y,radius){
  ribose(x,y,unit0)
  phosphorous(x+unit0*19/7,y-unit0*2/3,unit0)
}

function base_AG(x,y,radius,isA){
  textSize(textOffset);
  regpoly(x,y,radius,6,PI/6);
  
  function XYa(isX,index){
    a = PI/6+(TWO_PI/6)*index 
    return isX ? (x+cos(a)*radius) : (y+sin(a)*radius)
  }
  
  xP=x+radius-radius/4
  yP=y-radius*4/12-radius
  rP=radius*10/12
  aP=PI/6-(1/3)
  aN=TWO_PI/5
  regpoly(xP,yP,rP,5,aP)
  
  
  
  stroke(0)
  line(XYa(1,-2)-textOffset*2/7, XYa(0,-2)+textOffset-2/3, XYa(1,-1)-textOffset/2, XYa(0,-1)+textOffset*2/3)
  
  xN3 =XYa(1,3)
  yN3 =XYa(0,3)
  
  xN4 =XYa(1,1)
  yN4 =XYa(0,1)
    
  line(XYa(1,2)+textOffset, XYa(0,2)-textOffset/2, xN3+textOffset, yN3+textOffset/2)
  
  fill(0)
  noStroke();
  fill(255)
  rect(xN3-textOffset/2,yN3+textOffset/2,textOffset,-textOffset*2/3);
  rect(xN4-textOffset/2,yN4+textOffset/2,textOffset,-textOffset);
  fill(0)
  stroke(0);
  text("N",xN3-textOffset/2,yN3+textOffset/2)
  text("N",xN4-textOffset*3/7,yN4+textOffset/3)
  
  
  
  xN1=xP+cos(aP)*rP-textOffset/2
  yN1=yP+sin(aP)*rP+textOffset/2
  xN2=xP+cos(aP+aN*3)*rP-textOffset/2
  yN2=yP+sin(aP+aN*3)*rP+textOffset/2
  
  
  fill(0)
  noStroke();
  fill(255)
  rect(xN1,yN1+textOffset*2/3,textOffset,-textOffset*2/3);
  //rect(xN2,yN2,textOffset,-textOffset*2);
  fill(0)
  stroke(0);
  text("N",xN1,yN1)
  text("N",xN2,yN2)
  line(xN1-textOffset/2,yN1-textOffset/2, xP+cos(aP-aN)*rP-textOffset/2, yP+sin(aP-aN)*rP+textOffset/2)
  
  if(isA){
    line(xN4+textOffset/2,yN4-textOffset,XYa(1,0)-textOffset/2,XYa(0,0)-textOffset/2)
    
    l1sX = xN4-textOffset*4/7
    l1sY = yN4+textOffset/2
    stroke(255,0,0)
    strokeWeight(1.5);
    for(let mult=0;mult<3;mult++){
      line(l1sX, l1sY+textOffset*mult/3, l1sX+textOffset, l1sY+textOffset*mult/3)}
    
    stroke(0)
    strokeWeight(1)
    xNF = XYa(1,0) + (cos(PI/6) * radius*6/7)
    yNF = XYa(0,0) + (sin(PI/6) * radius*6/7)
    line(XYa(1,0), XYa(0,0), xNF, yNF)
    
    xNF2 = xNF+textOffset*2/7;
    yNF2 = yNF+textOffset;
    xHF = xNF2 + (cos(PI/6) * rP*2/3)
    yHF = yNF2 - (sin(PI/6) * rP*2/3)
    line(xNF, yNF, xHF, yHF)
    text("H",xHF,yHF+textOffset*2/7)
    text("N", xNF, yNF+textOffset/2)
    
    line(xNF2, yNF2-textOffset*3/7, xNF2, yNF2 + rP*2/3)
    
    xHF2 = xNF2-textOffset*3/7
    yHF2 = yNF2 + rP*6/7
    text("H",xHF2, yHF2)
    l1sX = xHF2-textOffset/7
    l1sY = yHF2+textOffset/3
    stroke(255,0,0)
    strokeWeight(1.5);
    for(let mult=0;mult<3;mult++){
      line(l1sX, l1sY+textOffset*mult/3, l1sX+textOffset, l1sY+textOffset*mult/3)}
    
    stroke(0)
    textSize(textOffset*3)
    fill(0,0,250)
    text("A",x-textOffset,y+textOffset*3/4)
    //fill(0,0,0)
    textSize(textOffset)
  }
  else{
    
    l1sX = xN4-textOffset*4/7
    l1sY = yN4+textOffset/2
    xHFD = l1sX+textOffset/7
    yHFD = l1sY + rP*6/7
    line(l1sX+textOffset/7+textOffset/3, l1sY,xHFD+textOffset/3,yHFD-textOffset)
    l1sY += rP*6/7+textOffset/2
    text("H",xHFD, yHFD)
    stroke(255,0,0)
    strokeWeight(1.5);
    for(let mult=0;mult<3;mult++){
      line(l1sX, l1sY+textOffset*mult/3, l1sX+textOffset, l1sY+textOffset*mult/3)}
    
    stroke(0)
    strokeWeight(1)
    xNF = XYa(1,2) - (cos(PI/6) * radius*6/7)
    yNF = XYa(0,2) + (sin(PI/6) * radius*6/7)
    line(XYa(1,2), XYa(0,2), xNF, yNF)
    
    xNF2 = xNF+textOffset*2/7;
    yNF2 = yNF+textOffset;
    xHF = xNF2 - (cos(PI/6) * rP*2/3)
    yHF = yNF2 - (sin(PI/6) * rP*2/3)
    line(xNF, yNF, xHF, yHF)
    text("H",xHF,yHF+textOffset*2/7)
    text("N", xNF, yNF+textOffset/2)
    
    line(xNF2, yNF2-textOffset*3/7, xNF2, yNF2 + rP*2/3)
    
    xHF2 = xNF2-textOffset*3/7
    yHF2 = yNF2 + rP*6/7
    text("H",xHF2, yHF2)
    l1sX = xHF2-textOffset/7
    l1sY = yHF2+textOffset/3
    stroke(255,0,0)
    strokeWeight(1.5);
    for(let mult=0;mult<3;mult++){
      line(l1sX, l1sY+textOffset*mult/3, l1sX+textOffset, l1sY+textOffset*mult/3)}
    
    stroke(0)
    xO = XYa(1,0);
    yO = XYa(0,0);
    yOU = yO - textOffset/3
    xOD = xO - textOffset/3
    yOD = yO + textOffset/3
    
    xOT = xO + (cos(PI/6) * rP*2/3)
    yOT = yO + (sin(PI/6) * rP*2/3) +textOffset
    line(xO,yOU,xOT,yOT-textOffset/2)
    line(xOD,yOD,xOT,yOT+textOffset/3)
    text("O", xOT, yOT+textOffset/2)
    
    l1sX = xOT-textOffset/7
    l1sY = yOT+textOffset*4/3
    stroke(255,0,0)
    strokeWeight(1.5);
    for(let mult=0;mult<3;mult++){
      line(l1sX, l1sY+textOffset*mult/3, l1sX+textOffset, l1sY+textOffset*mult/3)}
      
    stroke(0)
    textSize(textOffset*3)
    fill(0,0,250)
    text("G",x-textOffset*8/7,y+textOffset)
    //fill(0,0,0)
    textSize(textOffset)
  }
}

function base_CU(x,y,radius,isC){
  textSize(textOffset)
  regpoly(x,y,radius,6,PI/6)
  
  rP = radius*10/12
  
  function XYa(isX,index){
    a = PI/6+(TWO_PI/6)*index 
    return isX ? (x+cos(a)*radius) : (y+sin(a)*radius)
  }
  
  text("N",XYa(1,-1)-textOffset/2,XYa(0,-1)+textOffset/2)
  xND = XYa(1,1)-textOffset/2
  yND = XYa(0,1)+textOffset/2
  text("N",xND,yND)
  
  line(XYa(1,3)+textOffset/2,XYa(0,3)+textOffset/2, XYa(1,4)-textOffset/4,XYa(0,4)+textOffset*6/7)
  REDinnerSpacing = 55
  REDedgeSpacing = 55
  
  if(isC){
    stroke(0,0,250)
    textSize(textOffset*3)
    fill(0,0,250)
    text("C",x-textOffset*8/7,y+textOffset)
    textSize(textOffset)
    stroke(0)
    fill(0)
    
    line(xND+textOffset/2,yND-textOffset-textOffset/3,XYa(1,0)-textOffset*5/7,XYa(0,0)-textOffset/3)
    
    xNL = XYa(1,2) - cos(PI/6) * radius
    yNL = XYa(0,2) + sin(PI/6) * radius
    
    xNHU = xNL - cos(PI/6) * rP
    yNHU = yNL - sin(PI/6) * rP
    yNHD = yNL + rP
    xNHD = xNL+textOffset/3
    
    line(XYa(1,2), XYa(0,2), xNL+textOffset/2, yNL)
    text("N",xNL, yNL+textOffset/2)
    
    xRL = xND-textOffset/7
    yRL = yND+textOffset*3/2
    strokeWeight(2)
    stroke(255,0,0)
    for(let mult=0; mult<3;mult++){
      line(xRL,yRL+mult*REDinnerSpacing/textOffset,xRL+textOffset,yRL+mult*REDinnerSpacing/textOffset)
    }
    stroke(0)
    strokeWeight(1)
    
    line(xNL+textOffset/2,yNL, xNHU,yNHU)
    text("H",xNHU,yNHU+textOffset/2)
    
    line(xNHD, yNL, xNHD, yNHD)
    text("H",xNL,yNHD+textOffset/3)
    
    xRL = xNHD-textOffset/2
    yRL = yNHD+textOffset/2
    strokeWeight(2)
    stroke(255,0,0)
    for(let mult=0; mult<3;mult++){
      line(xRL,yRL+mult*REDedgeSpacing/textOffset,xRL+textOffset,yRL+mult*REDedgeSpacing/textOffset)
    }
    stroke(0)
    strokeWeight(1)
    
    x0 = XYa(1,0)
    y0 = XYa(0,0)
    
    xO1 = x0
    yO1 = y0 - textOffset/3
    xO2 = x0 - textOffset/3
    yO2 = y0 + textOffset/3
    
    xOT = x0 + cos(PI/6) * rP 
    yOT = y0 + sin(PI/6) * rP
    line(xO1, yO1, xOT, yOT-textOffset/3)
    line(xO2, yO2, xOT-textOffset/3, yOT+textOffset/3)
    text("O", xOT, yOT+textOffset/2)
    
    xRL = xOT-textOffset/7
    yRL = yOT+textOffset*19/8
    strokeWeight(2)
    stroke(255,0,0)
    for(let mult=0; mult<3;mult++){
      line(xRL,yRL+mult*REDinnerSpacing/textOffset,xRL+textOffset,yRL+mult*REDinnerSpacing/textOffset)
    }
    stroke(0)
    strokeWeight(1)
  }
  else{
    stroke(0,0,250)
    textSize(textOffset*3)
    fill(0,0,250)
    text("U",x-textOffset*8/7,y+textOffset)
    textSize(textOffset)
    stroke(0)
    fill(0)
    
    line(xND+textOffset/2,yND-textOffset-textOffset/3,XYa(1,0)-textOffset*5/7,XYa(0,0)-textOffset/3)
    
    xNL = XYa(1,2) - cos(PI/6) * radius
    yNL = XYa(0,2) + sin(PI/6) * radius
    
    xNHU = xNL - cos(PI/6) * rP
    yNHU = yNL - sin(PI/6) * rP
    
    line(XYa(1,2), XYa(0,2)-textOffset/3, xNL+textOffset/2, yNL-textOffset/3)
    line(XYa(1,2)+textOffset/3, XYa(0,2)+textOffset/3, xNL+textOffset/2+textOffset/3, yNL + textOffset/3)
    text("O",xNL, yNL+textOffset/2)
    
    xRL = xNL-textOffset/7
    yRL = yNL+textOffset*5/3
    strokeWeight(2)
    stroke(255,0,0)
    for(let mult=0; mult<3;mult++){
      line(xRL,yRL+mult*REDinnerSpacing/textOffset,xRL+textOffset,yRL+mult*REDinnerSpacing/textOffset)
    }
    stroke(0)
    strokeWeight(1)
    
    yNHD = yND + rP
    xNHD = xND+textOffset/3
    text("H",xNHD-textOffset/3,yNHD)
    
    line(xND+textOffset/3, yND, xNHD, yNHD)
    
    xRL = xNHD-textOffset/2
    yRL = yNHD+textOffset/2
    strokeWeight(2)
    stroke(255,0,0)
    for(let mult=0; mult<3;mult++){
      line(xRL,yRL+mult*REDedgeSpacing/textOffset,xRL+textOffset,yRL+mult*REDedgeSpacing/textOffset)
    }
    stroke(0)
    strokeWeight(1)
    
    x0 = XYa(1,0)
    y0 = XYa(0,0)
    
    xO1 = x0
    yO1 = y0 - textOffset/3
    xO2 = x0 - textOffset/3
    yO2 = y0 + textOffset/3
    
    xOT = x0 + cos(PI/6) * rP 
    yOT = y0 + sin(PI/6) * rP
    line(xO1, yO1, xOT, yOT-textOffset/3)
    line(xO2, yO2, xOT-textOffset/3, yOT+textOffset/3)
    text("O", xOT, yOT+textOffset/2)
  }
}

//halp
