const statistic = async (req, res) => {
    try {
      const userId = req.user.id;
      
      const user = await knex('users').select('wallet').where({ user_id: userId }).first();
      
      const earning = await knex('earnings').sum('amount as total_earning').where({ user_id: userId }).first();
      const payment = await knex('payments').sum('amount as total_payment').where({ user_id: userId }).first();
      
      const allEarningsCount = await knex('earnings').count('amount as count').where({ user_id: userId }).first();
      const allPaymentsCount = await knex('payments').count('amount as count').where({ user_id: userId }).first();
      
      res.json({
        umumiy: user.wallet,
        kirim: earning,
        chiqim: payment,
        allearning: allEarningsCount.count,
        alpayment: allPaymentsCount.count
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  