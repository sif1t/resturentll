var express = require('express');
var router = express.Router();


const { isAuth, isAdmin } = require('../config/auth')

const base_url = process.env.BASEURL || 'https://resturentll.onrender.com';

var User = require('../models/User');
var Categories = require('../models/Categories');
var Post = require('../models/Post');
var View = require('../models/View');


const ViewAdd = async (req) => {
  let date = new Date();
  date = date.toLocaleDateString('en-us', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  const postid = req.params.slug;
  const userip = req.socket.remoteAddress || req.ip;
  const referer = req.headers.referer;

  const useragent = req.session.useragent = {
    browser: req.useragent.browser,
    version: req.useragent.version,
    os: req.useragent.os,
    platform: req.useragent.platform,
    geoIp: req.useragent.geoIp, // needs support from nginx proxy
    source: req.useragent.source,
  };

  const ifconfigRes = await fetch(`https://ifconfig.co/json?ip=${userip}`);
  const ifconfig = await ifconfigRes.json();

  const user_agent = useragent;
  const device = req.device.type;
  const platform = useragent.platform;
  const operating = useragent.os;
  const browser = useragent.browser;
  const browser_version = useragent.version;
  let country;
  let time_zone;
  let asn;
  let asn_org;

  if (ifconfig.asn) {
    country = ifconfig.country;
    time_zone = ifconfig.time_zone;
    asn = ifconfig.asn;
    asn_org = ifconfig.asn_org;
  } else {
    country = '';
    time_zone = '';
    asn = '';
    asn_org = '';
  }

  const viewData = new View({
    postid: postid,
    userip: userip,
    method: 'GET',
    host: base_url,
    url: `${base_url}/${postid}`,
    referer: referer,
    user_agent: user_agent,
    country: country,
    device: device,
    platform: platform,
    operating: operating,
    browser: browser,
    browser_version: browser_version,
    time_zone: time_zone,
    asn: asn,
    asn_org: asn_org,
  });

  const PostView = await View.find({ postid: postid });
  var updatePost = {
    view: PostView.length,
  };

  await Post.updateOne({ slug: postid }, updatePost);

  const view = await View.findOne({ postid: postid, userip: userip, date_at: date });
  console.log('view :- ', view);
  if (view == null) {
    const addView = await new View(viewData).save()
    console.log('addView : ', addView)
  }
}





/* GET home page. */
router.get('/', async function (req, res, next) {
  const posts = await Post.find({});
  const data = {
    title: 'Nes Express',
    baseUrl: base_url,
    flashsms: req.flash('success'),
    flasherr: req.flash('error'),
    user: req.user,
    posts: posts,
  };
  res.render('index', data);
});




/* GET slug page. */
router.get('/news/:slug', async function (req, res, next) {

  let slug = req.params.slug;
  console.log('slug :- ', slug);
  const posts = await Post.find({});
  const post = await Post.findOne({ slug: slug });
  if (post) {
    ViewAdd(req);
    const data = {
      title: post.title,
      baseUrl: base_url,
      flashsms: req.flash('success'),
      flasherr: req.flash('error'),
      user: req.user,
      post: post,
    };
    res.render('postView', data);
  } else {
    const data = {
      title: 'Nes Express',
      baseUrl: base_url,
      flashsms: req.flash('success'),
      flasherr: req.flash('error'),
      user: req.user,
      posts: posts,
    };
    res.render('error404', data);
  }

});



router.get('/login', function (req, res, next) {
  res.render('login', { title: 'User account login', flashsms: req.flash('success'), user: req.user });
});

router.get('/register', function (req, res, next) {
  res.render('register', { title: 'User account register', errors: '', user: req.user });
});
router.get('/contant', function (req, res, next) {
  res.render('contant', { title: 'User account contant', errors: '', user: req.user });
});


module.exports = router;
