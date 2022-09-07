fetch('./data.json')
  .then((res) => res.json())
  .then((data) => {
    const bars = document.querySelectorAll('.bar');

    let highestAmount = 0;
    let highestDay = '';
    data.forEach((item) => {
      if (item.amount > highestAmount) {
        highestAmount = item.amount;
        highestDay = item.day;
      }
    });

    bars.forEach((bar) => {
      const day = bar.nextElementSibling.innerText;

      let percent = '';
      data.forEach((item) => {
        if (item.day === day && item.day !== highestDay) {
          const num = item.amount / (highestAmount / 100);
          percent = `${num.toFixed(2)}%`;
        }

        if (item.day === day) {
          const amountElement = bar.querySelector('.amount');
          amountElement.innerText = `$${item.amount}`;
        }
      });

      if (day === highestDay) {
        bar.classList.add('highest');
        bar.style.height = '100%';
        return;
      }

      bar.style.height = percent;
    });
  });
