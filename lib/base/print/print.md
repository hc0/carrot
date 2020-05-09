示例 Example ⬇️

```jsx
const print = (print) => {
  setTimeout(() => {
    print();
  }, 5000);
}

const beforePrint = () => {
  console.log("beforePrint1111", arguments);
};

const afterPrint = () => {
  console.log("afterPrint11111");
};

<Print
  print={print}
  beforePrint={beforePrint}
  afterPrint={afterPrint}
>
  <div>
    <p>show</p>
    <p className="printHide">要打印的内容</p>
  </div>
</Print>
```