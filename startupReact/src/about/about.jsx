import React from 'react';

export function About() {
  const[quote, setQuote] = React.useState({text: '...Loading', author: "Lee Jensen"});
  const[image, setImage] = React.useState(null);

  React.useEffect(() => {
    setTimeout(()=> {
    setQuote({text: "Words are cheep show me the code", author: "Linus Torvalds"});
    setImage('dice2.png');
    }, 5000);
    
  }, []);

  function fetchQuote(){
    setQuote({text: "Words are cheep show me the code", author: "TestThis"})
    setImage("tree.jpg")
  }

  return (
    <main>
      <h1>About 5e Dice Tools</h1>
        <p style={{"paddingRight": "15vw", "paddingLeft":"15vw", "marginTop":"10vh"}}>
          5e Dice Tools is a web application that allows users to roll dice for the popular tabletop role-playing game Dungeons & Dragons. The application is designed to be user-friendly and accessible to players of all experience levels. <br />
          The application features a simple interface that allows users to input the number and type of dice they want to roll, and then displays the results of the roll. Users can also create accounts and join rooms to roll dice with friends in real-time. <br />
          5e Dice Tools is a passion project created by Kirk McMasters, a software developer and avid Dungeon Master. Kirk created the application to help streamline the dice rolling process and make it easier for his players to enjoy the game.
        </p>

        <p>
          <button onClick={fetchQuote}> test </button>
          {quote.text}
          <br />
          {quote.author}
          {image && (
          <img src={image} alt="random" />)}
        </p>
        
    </main>
  );
}