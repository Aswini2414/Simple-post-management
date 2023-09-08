import { useState,useEffect,React } from 'react'
import { Grid, Card,CardContent, Typography,CardActions,Button,DialogTitle,Dialog,IconButton } from '@mui/material';
import { styled, alpha} from "@mui/material/styles";
import './App.css';
import Fuse from 'fuse.js';
import CloseIcon from "@mui/icons-material/Close";

const Sec = styled("section")`
  margin:9rem 3.5rem 0 3.5rem;
`;
const Post = styled(Card)`
  max-width: 45rem;
  @media (max-width: 1200px) {
    max-width: 50rem;
  }
  @media (max-width:387px) {
    max-width: 52rem;
  }
`;

const Content = styled(CardContent)`
  height: 21rem;
  @media (min-width: 1200px) and (max-width: 1250px) {
    height: 24rem;
  }
  @media (min-width: 702px) and (max-width: 860px) {
    height: 26rem;
  }
  @media (min-width: 650px) and (max-width: 702px) {
    height: 30rem;
  }
  @media (min-width: 387px) and (max-width: 440px) {
    height: 25rem;
  }
  @media (min-width: 200px) and (max-width: 387px) {
    height: 29rem;
  }
`;

const Title = styled(Typography)`
    font-weight:bold;
    text-transform:capitalize
`

const Body = styled(Typography)`
  margin-top: 1rem;
  font-size: 1.5rem;
  text-align: justify;
`;

const Btns = styled(CardActions)`
  display:flex;
  justify-content:space-between;
`

const Btn = styled(Button)`
  background: #4c6ef5;
  color: #fff;
  font-size: 1.5rem;
  :hover {
    color: #4c6ef5;
  }
`;

const Btn2 = styled(Button)`
  font-size: 1.5rem;
  margin-right: 0rem;
  font-weight: bold;
  :hover {
    background: #4c6ef5;
    color: #fff;
  }
  @media (max-width: 640px) {
    font-size: 1rem;
  }
  @media (max-width: 600px) {
    font-size: 1.5rem;
  }
`;

const DiaTit = styled(DialogTitle)`
  font-size: 2rem;
  color: #4c6ef5;
  font-weight:bold;
`;

const Name = styled(Typography)`
  color: #4c6ef5;
  margin:0 0 0 2rem;
  font-weight:bold;
`;

const Email = styled(Typography)`
  color: #343a40;
  margin-left: 2rem;
  font-weight:bold;
`;

const Comment = styled(Typography)`
  color: #343a40;
  margin:0 2rem 2rem 2rem;
  text-align:justify;
`;
 
const Posts = ({ data, search, handleDelete }) => {
    const [open, setOpen] = useState(false);
    const [num, setNum] = useState();
    const [dialogData, setDialogData] = useState([]);
    console.log(data);
    console.log(search);

    useEffect(() => {
        getComments(
          `https://jsonplaceholder.typicode.com/posts/${num}/comments`
        );
    }, [num]);

    const getComments = async (url) => {
        const response = await fetch(url);
        const apiData = await response.json();
        setDialogData(apiData);
    }


    const handleOpen = (id) => {
        console.log(id);
        setOpen(true);
        setNum(id)
    }

    const handleClose = (id) => {
        setOpen(false);
    };

    const fuse = new Fuse(data, {
        keys: [
            'title',
            'body'
        ]
    });

    const results = fuse.search(search);
    const dataResults = search ? results.map(result => result.item) : data;


    return (
      <Sec>
        <Grid container spacing={2}>
          {dataResults.map((post) => {
            const { userId, id, title, body } = post;
            return (
              <Grid item xs={12} sm={6} lg={4}>
                <Post sx={{ maxWidth: 450 }}>
                  <Content>
                    <Title variant="h4">{title}</Title>
                    <Body variant="body1">{body}</Body>
                  </Content>
                  <Btns>
                    <Btn
                      variant="Contained"
                      onClick={(e) => {
                        handleDelete(e, id);
                      }}
                    >
                      Delete
                    </Btn>
                    <Btn2 variant="text" onClick={() => handleOpen(id)}>
                      View Comments
                    </Btn2>
                  </Btns>
                </Post>
              </Grid>
            );
          })}
        </Grid>
        <Dialog open={open} onClose={() => handleClose()}>
          <DiaTit>Comments</DiaTit>
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={{
              position: "absolute",
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon sx={{ fontSize: "2rem", color: "#212529",fontWeight:"bold" }} />
          </IconButton>
          {dialogData.map((com) => {
            const { id, name, email, body } = com;
            return (
              <>
                <Name variant="h4">{name}</Name>
                <Email variant="h5">{email}</Email>
                <Comment variant="h6">{body}</Comment>
              </>
            );
          })}
        </Dialog>
      </Sec>
    );
}

export default Posts