const stripe = require('stripe')('pk_test_gp5o6z9GgLEIBpHjZHdkb9cm00BWcvGYze');

async function postCharge(req, res) {
    try {
        const {
            amount,
            source,
            receipt_email
        } = req.body;

        const charge = await stripe.charges.create({
            amount,
            currency: 'usd',
            source,
            receipt_email
        });

        if (!charge) throw new Error('Charge unsuccessful');

        res.status(200).json({
            message: 'Charge posted successfully',
            charge
        })
    } catch (error) {
        res.status(500).json({
            message: error.message
        })
    }
};

module.exports = postCharge;