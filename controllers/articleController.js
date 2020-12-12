const catchAsync = require('../utils/catchAsync');
const axios = require('axios').default;


exports.getAllArticle = catchAsync(async (req, res) => {
    const config = {
        headers: {
            'x-apikey': '7a42a1bbb286d8bc8479ba2913acf83f1b4d8',
            'Content-Type': 'application/json'
        }
    }
    const response_articles = await axios.get('https://jsherokunodedb-060f.restdb.io/rest/article', config);  
    res.send(response_articles.data);
});

exports.getOneArticle = catchAsync(async (req, res) => {
    const config = {
        headers: {
            'x-apikey': '7a42a1bbb286d8bc8479ba2913acf83f1b4d8',
            'Content-Type': 'application/json'
        } 
    }
    const response_articles = await axios.get(`https://jsherokunodedb-060f.restdb.io/rest/article/${id}`, config);  
    res.send(response_articles.data);
});

exports.createArticle = catchAsync(async (req, res) => {
    console.log('test 1');
    const config = {
        headers: { 'x-apikey': '7a42a1bbb286d8bc8479ba2913acf83f1b4d8' }
    }
    console.log('test 2');

    const data = {
        title: 'un quatrième article',
        content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin sagittis ornare condimentum. Etiam auctor lectus non lacus iaculis, vitae pulvinar enim rutrum. Ut porta, sapien ac finibus molestie, est nisi fermentum ipsum, eget bibendum nisl metus ac arcu. Fusce ut risus in erat semper maximus nec eget elit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse non purus malesuada, commodo nulla nec, semper arcu. Nunc maximus dui mauris, sed porta tortor posuere et. Maecenas varius lacinia porttitor. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec at enim efficitur, efficitur sem in, convallis turpis. Nulla eu massa at arcu faucibus posuere. Integer et eleifend odio, id dapibus sem.  Aliquam ullamcorper, velit nec congue rhoncus, ante nibh lacinia erat, sed facilisis massa magna volutpat dolor. Etiam et rhoncus tortor, vitae fermentum justo. Maecenas eu consectetur enim. Vivamus eget ante aliquet, blandit magna a, ornare est. Nunc luctus egestas risus, nec elementum arcu rhoncus eget. Aliquam eu eros eleifend, bibendum nunc sed, faucibus lorem. Donec diam tellus, dignissim eget odio et, lacinia malesuada nulla. Aliquam semper iaculis dui, non tempor velit facilisis bibendum. Nam eu magna suscipit, pretium sem at, sodales neque. Praesent sollicitudin neque vitae orci maximus feugiat. Curabitur suscipit mattis dolor at pulvinar. Aenean eget ipsum scelerisque, placerat diam sit amet, mattis odio. Curabitur vel tempor purus. Donec porttitor at eros eget faucibus. Donec rhoncus sem enim, id blandit lorem malesuada vel. Sed vel posuere est.  Vivamus vitae auctor orci. Curabitur lobortis neque non arcu egestas molestie. Nulla tincidunt risus nulla, at viverra diam aliquet et. Proin a dui porttitor, ornare enim ut, tincidunt ligula. Vivamus a erat ac risus tincidunt dignissim eget eu mauris. Aliquam ultrices erat et sapien euismod, quis molestie odio maximus. Vivamus feugiat augue lectus, nec mattis velit porta consequat. Etiam dignissim aliquet eros, at cursus nulla tempus quis. In dignissim tempor sodales.  Duis a tincidunt ante. Pellentesque maximus lectus sapien, ac fermentum est congue quis. Phasellus vel pretium eros, in dapibus turpis. Praesent ut posuere eros. Morbi a tortor sed enim rhoncus laoreet. Aliquam sollicitudin quam non dui tempor placerat. In hac habitasse platea dictumst. Morbi malesuada lectus id sem finibus, id dictum dui dictum.  Nulla suscipit orci id nibh tempor iaculis. Nam eu arcu risus. Nam hendrerit, mauris posuere iaculis vestibulum, turpis elit mollis sem, vitae congue neque eros id orci. Duis vulputate semper augue quis consectetur. Nunc urna lorem, commodo eu ultrices vel, tristique quis ipsum. Quisque ultrices vestibulum lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi quis efficitur nisi, ut auctor sapien. Ut vel neque ut diam posuere tristique.',
        author: 'Jean Simondon',
        publish_date: Date.now(),
        cover: 'une image',
    }
    console.log('test 3');

    const url = 'https://jsherokunodedb-060f.restdb.io/rest/article'
    console.log('test 4');

    const response = await axios.post(url, data, config);
    console.log('test 4');

    console.log(response);
    res.send('article créé');
});


// 
// params: {
//     q: {
//         title: "une quatrième "
//     }
// }



exports.updateArticle = catchAsync(async (req, res) => {
res.status(200).json({
    status: 'road under construction',
    });
});

exports.deleteArticle = catchAsync(async (req, res) => {
res.status(200).json({
    status: 'road under construction',
    });
});
