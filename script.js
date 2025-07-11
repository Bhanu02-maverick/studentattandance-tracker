let grid=document.getElementById("attendance-grid");
const students=["ABBURI LAKSHMI HARIKA ABBURI GANGA RAJU ABBURI", "AMEERUNNISA", "AMUKANTI RAKESH KUMAR REDDY", "AVULA SUPRABHATH", "AYILURI BALARAM REDDY", "BALE AKSHAY", "BALUSA MOUNIKA", "BOGGARAPU HRUTHIKIRAN", "Bollam Rohith Kumar", "D ABHISHEK YADAV", "D VIJAYESHWARI D.V.S SATYANARAYANA DESU", "DHARAVATH SUSHMITHA", "DODDA HARIKA", "GAMPA ASHWITHA", "GIDDALURI EUNICE BLESSY", "GOLLA GOURI SHANKAR", "GOLLE SAI MOHAN", "GOVATHOTY JOSH KUMAR", "GUNDRATHI PRERAN KUMAR", "GURRAM THANUSHA", "GUTHI VARUN TEJA", "GUTTULA SAI PRIYA", "HERAKAR NITHISH", "KARYAMPUDI PRIYANKA", "KATKAM SRIRAM", "KETHAVATH ANIL", "KOTHAPALLY KAVYASAI", "KUCHIPATLA SUJITH ROHAN REDDY", "KURAPATI DHANUSH", "KUSUNURU JYOTHI", "LAKSH DHAMIJA", "LALKOTA KOUSHIK", "M BHANU TEJA", "MADI PUNITH REDDY", "MANDA JHANSIVARDHINI", "MOHD SARFARAZ", "N RAKESH", "NAINI MEGHANA", "NAKKA DILEEP ADITYA", "PALLY ANIRVESH", "PANATULA JOTHSNA LAKSHMI UMASRI", "PARANKUSAM TISHYATHI", "PATHURI HASINI", "PATLAVATH SHIVAKUMAR NAIK", "PEDDAPATI MAMATHA PEDDAPATI BUCHANNA", "PIREDDY NAGA BHARGAV REDDY", "POLA VAISHNAVI", "PREETHAM KESHIREDDY", "PULLELA SATHWIK", "R RAJKUMAR", "RANGU NANDESHWAR GOUD", "SATHISH KODARI", "SHAIK SHIREEN SUMAIAH", "SIDDHARTH KARANAM", "SRI SATYA SUBHAM PERI", "SYEDA SAYEEDA FARHATH", "T PALLAVI", "TANGELLA PAVAN SAI REDDY", "TOPALLE SIDDHA SANKALP", "VADLA NANDAKISHORE", "VEESAM ESHWAR PRASAD", "VENNAPUREDDY SATHWIK VENNAPUREDDY", "YELGANAMONI VIVEKVARDHAN", "YERRAGINNELA MANISHANKAR"];
const prefix="23881A05";
const sufix=[];
sufix.push("C9");
const startChar = 'D'.charCodeAt(0);
const endChar = 'K'.charCodeAt(0);
for(let ch=startChar;ch<=endChar;ch++){
    if(String.fromCharCode(ch)=="I")
        continue;
    for(let num=0;num<=9;num++){
        sufix.push(String.fromCharCode(ch) + num);
        if(sufix.length===64)
             break;
    }
     if(sufix.length===64)
             break;
    

}
sufix.length=64;
let cntp=0;
let cnta=0;
for(let i=0;i<64;i++){
const name=document.createElement("div");
name.className="cell";
name.innerText= students[i];

const rollno=document.createElement("div")
rollno.className="cell";
rollno.innerText=prefix+sufix[i];

const present=document.createElement("div");
present.className="cell hide-in-pdf";
const prsntbtn=document.createElement("button");
prsntbtn.className="prsnt";

prsntbtn.innerText="Present";
prsntbtn.addEventListener("click",()=>{
    cntp++;
     document.getElementById(`result-${i}`).innerText = 'Present';
      updatecount()
});
present.appendChild(prsntbtn);

const absnt=document.createElement("div");
absnt.className="cell hide-in-pdf";
const absntbtn=document.createElement("button");
absntbtn.className="absnt";
absntbtn.innerText="Abscent";
absntbtn.addEventListener("click",()=>{
     document.getElementById(`result-${i}`).innerText = 'Abscent';
     cnta++;
     updatecount();
});
absnt.appendChild(absntbtn);


const result=document.createElement("div");
result.className="cell";
result.id=`result-${i}`;
result.innerText="";


grid.appendChild(name);
grid.appendChild(rollno);
grid.appendChild(present);
grid.appendChild(absnt);
grid.appendChild(result);
}
 function updatecount(){
    document.getElementById("pr").innerText="PRESENT : "+cntp;
    document.getElementById("ab").innerText="ABSCENT : "+cnta;
 }
 
 
 
 
 document.getElementById("download-pdf").addEventListener("click", async () => {
  const { jsPDF } = window.jspdf;
  const element = document.getElementById("attendance-grid");

  // Ensure full content is visible
  element.style.height = 'auto';

  // Show buttons (since you want them in PDF)
  //document.querySelectorAll('button').forEach(btn => btn.style.visibility = 'visible');

  const canvas = await html2canvas(element, {
    scrollY: -window.scrollY,
    scale: 2,
  });

  const imgData = canvas.toDataURL("image/png");

  const pdf = new jsPDF("p", "mm", "a4");
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = pdf.internal.pageSize.getHeight();

  const imgProps = {
    width: pdfWidth,
    height: (canvas.height * pdfWidth) / canvas.width
  };

  let position = 0;
  let pageHeightLeft = imgProps.height;

  // First page
  pdf.addImage(imgData, "PNG", 0, position, imgProps.width, imgProps.height);
  pageHeightLeft -= pdfHeight;

  // Add more pages if needed
  while (pageHeightLeft > 0) {
    position -= pdfHeight;
    pdf.addPage();
    pdf.addImage(imgData, "PNG", 0, position, imgProps.width, imgProps.height);
    pageHeightLeft -= pdfHeight;
  }

  pdf.save("attendance-full.pdf");
});
