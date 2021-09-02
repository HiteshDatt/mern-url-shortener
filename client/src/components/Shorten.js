import React,{ useEffect, useState } from 'react';
import validator from 'validator';
import Graph from './Graph';
import ShareIcon from '@material-ui/icons/Share';
import {
    FacebookShareButton,
    LinkedinShareButton,
    TwitterShareButton,
    WhatsappShareButton
  } from "react-share";
import FacebookIcon from '@material-ui/icons/Facebook';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import TwitterIcon from '@material-ui/icons/Twitter';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > * + *': {
      marginLeft: theme.spacing(2),
    },
    justifyContent: 'center'
  },
}));

function Shorten() {
    const [shortUrlList, setShortUrlList] = useState([]);
    const [fullUrlInput, setFullUrlInput] = useState('');
    const [shortUrlInput, setShortUrlInput] = useState('');
    const [reloadUrls, setReloadUrls] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [urlConflict, setUrlConflict] = useState(false);


    const handleFullUrlChange = (e) =>{
        setFullUrlInput(e.target.value);
    }

    const handleShortUrlChange = (e) =>{
        e.target.value = e.target.value.replace(/ /g,'');//removing spaces from the string
        setShortUrlInput(e.target.value)
    }

    const handleLinkClick = (e, url) =>{
        e.preventDefault();
        window.open(`http://hkurl.ml/${url}`,'_blank');
        setTimeout( ()=>{
          setReloadUrls(prevState => !prevState)
        }, 900);
    }

    const checkUrlConflict = (shortUrlEntered) =>{      
        for(let i = 0; i < shortUrlList.length; i++){
          if(shortUrlList[i].short == shortUrlEntered){
            return true;
          }
        }
        return false;
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(checkUrlConflict(shortUrlInput)){
            setUrlConflict(true);
            return;
        }
        
        if(validator.isURL(fullUrlInput,{ protocols: ['http','https','ftp'],require_protocol: true})){
            const Data = {
                fullUrl: fullUrlInput,
                shortUrl: (shortUrlInput ? shortUrlInput : undefined)
            }

            fetch('https://hkurl-api.herokuapp.com/shortUrls', {
                method: "POST",
                body: JSON.stringify(Data),
                headers: {"Content-type": "application/json; charset=UTF-8"}
            })
            .then(response => response.json()) 
            .then(
                setTimeout(()=>{
                  setReloadUrls(prevState => !prevState)
                }, 1500)
            )
        }
        else{
            console.log('invalid URL')
        }

    }

    useEffect(() => {
        setIsLoading(true);

        fetch("https://hkurl-api.herokuapp.com/url-shortener")
          .then(res => res.json())
          .then(
            (result) => {
              setShortUrlList(result.shortUrls);
              setIsLoading(false);
            },
            (error) => {
              console.error(error);
            }
          )
    
      }, [reloadUrls])

    const classes = useStyles();

    return (
    <>
    <div className="url-short">
      {(isLoading) ?
      <div className={classes.root}>
        <CircularProgress />
      </div>
       :
      <>
        <h1 className="heading">URL Shortener</h1>
      <form name="shortener">
        <div className="form-req">
          <input required placeholder="URL" type="url" name="fullUrl" value={fullUrlInput} 
          onChange={handleFullUrlChange}/>
          <button onClick={handleSubmit}>Shorten</button>
        </div>
          <span>hkurl.ml/</span>
          <input id="optn" placeholder="Short URL (optional)" type="text" name="shortUrl"
          value={shortUrlInput} onChange={handleShortUrlChange}/>
      </form>
      
      <table >
        <thead>
          <tr>
            <th>Full URL</th>
            <th>Short URL</th>
            <th>Clicks</th>
          </tr>
        </thead>
        <tbody>
           {(shortUrlList && shortUrlList.length>0)&& 
                shortUrlList.map(shortUrl => {
                return(
                <tr key={shortUrl._id}>
                <td>
                    <a href={shortUrl.full} target="_blank" rel ="nofollow noreferrer"> {shortUrl.full} </a>
                </td>
                <td>
                    <a href={`http://hkurl.ml/${shortUrl.short}`} target="_blank"
                     rel="nofollow noreferrer" onClick={(e)=>handleLinkClick(e,shortUrl.short)}>
                        hkurl.ml/{shortUrl.short} </a>
                </td>
                <td id= "clicks"> {shortUrl.clicks} 
                <span className="share-icon">
                    <ShareIcon/>
                    <div className="tooltip"> 
                    <FacebookShareButton url={`http://hkurl.ml/${shortUrl.short}`} children={<FacebookIcon style={{fill:'#4267B2'}}/>}/> 
                    
                    <WhatsappShareButton url={`http://hkurl.ml/${shortUrl.short}`} children={<WhatsAppIcon style={{fill:'#4FCE5D'}}/>}/>

                    <TwitterShareButton url={`http://hkurl.ml/${shortUrl.short}`} children={<TwitterIcon style={{fill:'#1DA1F2'}}/>}/>
                    
                    <LinkedinShareButton url={`http://hkurl.ml/${shortUrl.short}`} children={<LinkedInIcon style={{fill:'#0077b5'}}/>}/>
                    </div>
                </span>
                </td>
                </tr>
                )
            }) 
           }
        </tbody>
      </table>

      <div  className="graph-container">
        <h1 className="heading">URL Analytics</h1>
        <Graph shortUrlList={shortUrlList}/>
      </div>
      </>}
    </div>

    <div class="modal" style={{display: (urlConflict) ? 'block' : 'none'}}>
      <div class="modal-content">
        <p>Entered Short URL already exists! Please choose a new one.</p>
        <div class="close" onClick={()=>{setUrlConflict(false)}}>&times;</div>
      </div>    
    </div>

    </>
    )
}

export default Shorten
