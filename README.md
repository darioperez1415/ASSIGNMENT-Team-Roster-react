# Team Roster
For this project you will be building a team roster for a sports team.This app looks at Liverpool FC players and the user is able to list their favorite players.

src =https://i.ibb.co/bXrmpWJ/Liv.png
## Features
- Authentication - Users can login and logout of the application using Google.
- Routing - Used to navigate between the Home page,Team, and New Player through buttons.
- CRUD - Users can created, read, update, and delete players through first adding a new player in the "New Player Form and then Naviagatig to Team to see the new player.
- React and Reactstrap
- Styled Components

## Video Walkthrough of Team Roster 

## Relevant Links <

## Code Snippet <
The useEffect hook is used to check dependency values from the last render.
```
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      if (player.firebaseKey) {
        setFormInput({
          name: player.name,
          number: player.number,
          firebaseKey: player.firebaseKey,
          position: player.position,
          imageUrl: player.imageUrl,
          uid: user.uid,
        });
      }
    }
    return () => {
      isMounted = false;
    };
  }, [player]);
```

## Project Screenshots <

## Contributors
- [Dario Perez](https://github.com/darioperez1415)