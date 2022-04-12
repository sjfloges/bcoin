<template>
  <div class="container">
    <div class="row">
      <div class="col col-12">
        <app-card>
          <h2 class="mb-4">
            <span class="clr-dark">Welcome Back, </span>
            <span class="clr-primary">{{ user.firstname }} {{ user.lastname }}</span>
            <span class="clr-dark">! 👋</span></h2>
          <h3>
            <i class="fas fa-book-open mr-75 clr-primary opacity-85" />
            <span class="clr-dark">Starting Guide</span>
          </h3>
          <!-- eslint-disable  vue/max-attributes-per-line -->
          <accordion>
            <accordion-item>
              <template v-slot:title>
                What is The BoTCoin Market?
              </template>
              <template v-slot:content>
                <p>A BoTCoin ® is equal to one US Dollar (US$) and is the currency for telecoms trade. BoTCoin ® are regulated by the Malta Financial Services Authority (MFSA) the Maltese regulator.</p>
              </template>
            </accordion-item>

            <accordion-item>
              <template v-slot:title>
                What is a BoTCoin® Account?
              </template>
              <template v-slot:content>
                <p>A BoTCoin® account is an account where BoTCoin can be deposited, used to pay other BoTCoin accounts or can be withdrawn to your nominated Bank account.</p>
              </template>
            </accordion-item>

            <accordion-item>
              <template v-slot:title>
                Who can use BoTCoins?
              </template>
              <template v-slot:content>
                <p>Bank of Telecom members (<a href="http://www.bankoftelecom.com/" target="_blank">www.bankoftelecom.com</a>) may open a BoTCoin ® with BoTCoin Services Ltd, subject to status.</p>
              </template>
            </accordion-item>

            <accordion-item>
              <template v-slot:title>
                Benefits of using BoTCoin?
              </template>
              <template v-slot:content>
                <p>Save on you transaction fees, speed up payments and receipt, earn money as you go!</p>
                <ul>
                  <li>Transaction fee $30</li>
                  <li>Withdrawal or Deposit fee $60</li>
                  <li>Joining Bonus 1% of initial deposit (max initial Deposit US$50,000)</li>
                  <li>Loyalty Bonus 0.25% per month on average BoTCoin deposit value.</li>
                  <li>BoTCoin transaction are instantaneous</li>
                  <li>BoTCoin Deposits and Withdrawals are sameday</li>
                  <li>BoTCoin is always open for Transactions 247 and 365.</li>
                </ul>
              </template>
            </accordion-item>

            <accordion-item>
              <template v-slot:title>
                How secure is BoTCoin ®?
              </template>
              <template v-slot:content>
                <p>BoTCoin Services Ltd (BSL) offers BoTCoin accounts and BSL is regulated by the Malta Financial Services Authority (MFSA).</p>
                <p>Your admin key sits outside the network and is your personal responsibility; never share your credentials of any Bank account with a third party.</p>
              </template>
            </accordion-item>

            <accordion-item>
              <template v-slot:title>
                How do I open a BoTCoin Account?
              </template>
              <template v-slot:content>
                <p>Existing Bank of Telecom Members may Opt In to open a BoTCoin account. BoTCoin accounts are available subject to status. Go to <a href="http://www.bankoftelecom.com/" target="_blank">www.bankoftelecom.com</a> log in and Opt In to join BoTCoin ®</p>
                <p>Contact us direct at <a href="https://www.botcoin.mt/" target="_blank">www.botcoin.mt</a> for more information.</p>
              </template>
            </accordion-item>

            <accordion-item>
              <template v-slot:title>
                How to Deposit USD funds into BoTCoins?
              </template>
              <template v-slot:content>
                <ul>
                  <li>Click on the DEPOSIT tab and enter your Deposit value. Follow the payment instructions that maybe downloaded at the site.</li>
                  <li class="font-weight-500">Please be sure to add the identification number 15035 in the beneficiary note </li>
                  <li>Once the payment is done, upload payment confirmation when it has been sent</li>
                  <li>Your BoTCoin account is credited on receipt of funds.</li>
                </ul>
              </template>
            </accordion-item>

            <accordion-item>
              <template v-slot:title>
                How do I pay another BoTCoin account?
              </template>
              <template v-slot:content>
                <ul>
                  <li>Click on the TRANSFER tab and type the value of the BoTcoin you would like to pay.</li>
                  <li>Type the company name of the beneficiary and select it</li>
                  <li>Click ‘Transfer’</li>
                  <li>Add the “beneficiary note” into pop-up…</li>
                  <li>Confirm transaction.</li>
                </ul>
              </template>
            </accordion-item>

            <accordion-item>
              <template v-slot:title>
                How do I withdraw funds to my bank account?
              </template>
              <template v-slot:content>
                <ul>
                  <li>Click on the WITHDRAW tab and register upcoming withdraw transaction</li>
                  <li>Add Withdrawal value.</li>
                  <li>Withdrawal will show as ‘Pending’.</li>
                  <li>Email confirmation is then sent to confirm Withdrawal and completion of transaction.</li>
                </ul>
                <p class="font-italic">Note: Funds received in your BoTCoin account and any joining or laoyaty bonuses can be Withdrawn at any time. Your deposits can be used for Transactions at any time. If you make a deposit to your BoTCoin account deposit withdrawal can be made after 30 days.</p>
              </template>
            </accordion-item>

            <accordion-item>
              <template v-slot:title>
                What is e-mail based support and how it works?
              </template>
              <template v-slot:content>
                <p>BoTCoin is never too far away if you need a helping hand with anything you can use the support page to contact us via filling the form ‘Contact BoTCoin® Support Team’.</p>
                <p>We will contact you via e-mail within 24 business hours with a resolution or next steps if required.</p>
              </template>
            </accordion-item>
          </accordion>
        </app-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Dashboard',
  computed: {
    user() {
      return this.$store.state.auth.user
    },
  },
  methods: {

  }
}
</script>
