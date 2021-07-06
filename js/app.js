let attemptel = document.getElementById('attempt');
let containerel = document.getElementById('container');
let leftimgel = document.getElementById('leftimg');
let midimgel = document.getElementById('midimg');
let rightimgel = document.getElementById('rightimg');
let resultel = document.getElementById('results');

let busimages = [];
let attempts = 0;
let maxattempts = 25;
let chartnames = [];
let votes = [];
let chartviews = [];

function Busimage(busname) {
    this.busname = busname.split('.')[0];
    this.img = 'img/' + busname;
    this.vote = 0;
    this.views =0;
    
    busimages.push(this);
    chartnames.push(this.busname)

}


let images = ['bag.jpg', 'banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg', 'chair.jpg', 'cthulhu.jpg', 'dog-duck.jpg', 'dragon.jpg', 'pen.jpg', 'pet-sweep.jpg', 'scissors.jpg', 'shark.jpg', 'sweep.png', 'unicorn.jpg', 'tauntaun.jpg', 'water-can.jpg', 'wine-glass.jpg',]


for (let i = 0; i < images.length; i++) {

    new Busimage(images[i])
}

function randomindex() {

    return Math.floor(Math.random() * busimages.length)


}

let leftindex;
let midindex;
let rightindex;
let newindex = [];


function renderimage() {

    leftindex = randomindex();
     midindex = randomindex();
     rightindex = randomindex();

    while (leftindex === rightindex || leftindex === midindex || midindex === rightindex || newindex.includes(leftindex) || newindex.includes(midindex) || newindex.includes(rightindex) )
    
    {

        leftindex = randomindex();
        midindex = randomindex();
        rightindex = randomindex();



    }
    newindex=[];
    newindex.push(rightindex,midindex,leftindex);
    console.log(newindex);


    leftimgel.setAttribute('src', busimages[leftindex].img);
    midimgel.setAttribute('src', busimages[midindex].img);
    rightimgel.setAttribute('src', busimages[rightindex].img);
    
    busimages[leftindex].views++
    busimages[midindex].views++
    busimages[rightindex].views++


}

renderimage();



leftimgel.addEventListener('click', handelClicks);
midimgel.addEventListener('click', handelClicks);
rightimgel.addEventListener('click', handelClicks);


function handelClicks(event) {
    attempts++;
    if(attempts <= maxattempts){

    let clickedimg = event.target.id;

    if (clickedimg === 'leftimg') 
    {
        busimages[leftindex].vote++;
    }
    
     else if (clickedimg === 'midimg')
    {
        busimages[midindex].vote++;

    } 
    else if  (clickedimg === 'rightimg')
    {

        busimages[rightindex].vote++;
    }
    renderimage(); 

} else {

    
    let resultel = document.getElementById('results');
    
    for(let i=0; i < busimages.length; i++){

        let liel = document.createElement('li');
        
        liel.textContent = `${busimages[i].busname} has ${busimages[i].vote} votes and it was seen ${busimages[i].views} times `
        resultel.appendChild(liel);
votes.push(busimages[i].vote)
chartviews.push(busimages[i].views)
    }
   

    leftimgel.removeEventListener('click', handelClicks)
    midimgel.removeEventListener('click', handelClicks)
    rightimgel.removeEventListener('click', handelClicks)
    chartrender()
}



}









function chartrender(){
let ctx = document.getElementById('myChart').getContext('2d');
let myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: chartnames,
        datasets: [{
            label: '# of Votes',
            data: votes,    
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
            
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                
            ],
            borderWidth: 1
        },
        {
            label: '# views',
            data: chartviews,    
            backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 99, 132, 0.2)',
               
            
            ],
            borderColor: [
                'rgba(54, 162, 235, 1)',
                'rgba(255, 99, 132, 1)',
              
                
            ],
            borderWidth: 1
        }
    
    ]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});





}























































