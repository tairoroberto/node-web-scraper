var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var app = express();

app.get('/highest-paid', function (req, res) {
    // Let's scrape Anchorman 2
    url = 'https://remoteok.io/highest-paid-remote-jobs';

    request(url, function (error, response, html) {
        if (!error) {

            var jobs = [];
            var $ = cheerio.load(html);
            $('.job').each(function () {
                var job = {};
                job.order = $(this).children().eq(0).text();
                job.tags = $(this).children().eq(1).text();
                job.salary = $(this).children(2).eq().text();
                job.deviation = $(this).children().eq(3).text();
                job.amount = $(this).children().eq(4).text();

                jobs.push(job);
            });

            res.send(JSON.stringify(jobs));
        }
    })
});


app.get('/remote-companies', function (req, res) {
    // Let's scrape Anchorman 2
    url = 'https://remoteok.io/remote-companies';

    request(url, function (error, response, html) {
        if (!error) {

            var companies = [];
            var $ = cheerio.load(html);
            $('.job').each(function () {
                var company = {};
                company.rank = $(this).children().eq(0).text();
                company.image = $(this).children().eq(1).find('div').attr('src');
                company.company = $(this).children().eq(2).text();

                company.tags = [];

                $(this).children().eq(3).each(function () {
                    $(this).children().each(function () {
                        company.tags.push($(this).text());
                    });
                });

                company.aggregateRating = $(this).children().eq(4).text();

                companies.push(company);
            });

            res.send(JSON.stringify(companies));
        }
    })
});

app.get('/statistics', function (req, res) {
    // Let's scrape Anchorman 2
    url = 'https://remoteok.io/remote-work-statistics';

    request(url, function (error, response, html) {
        if (!error) {

            var statistics = [];
            var $ = cheerio.load(html);
            $('tr').each(function () {
                var statistic = {};

                if ($(this).children().eq(0).text().length < 15 &&
                    $(this).children().eq(1).text().length < 15) {
                    statistic.tag = $(this).children().eq(0).text();
                    statistic.count = $(this).children().eq(1).text();
                    statistic.percent = $(this).children().eq(2).text();

                    statistics.push(statistic);
                }
            });

            res.send(JSON.stringify(statistics));
        }
    })
});

app.listen('8082');
console.log('Magic happens on port 8081');
exports = module.exports = app;
