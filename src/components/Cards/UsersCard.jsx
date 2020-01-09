import React, { Component } from "react";
import {
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  CardActions,
  Avatar,
  IconButton,
  Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import MoreVertIcon from "@material-ui/icons/MoreVert";

const styles = theme => ({
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  avatar: {
    backgroundColor: red[500]
  }
});

class UsersCard extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar
              src="https://media.licdn.com/dms/image/C5603AQHrnJjaX7E8Sw/profile-displayphoto-shrink_800_800/0?e=1583971200&v=beta&t=rJLkIVdvlWAKmpk3q4VtaiTujX2fGtwpVz_4i3_-6so"
              aria-label="user-profile"
              className={classes.avatar}
            ></Avatar>
          }
          action={
            <IconButton aria-label="settings">
              <MoreVertIcon />
            </IconButton>
          }
          title="This Guy"
          subheader=""
        />
        <CardMedia className={classes.media} image="" title="Who am I?" />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p">
            Put something here
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(UsersCard);
