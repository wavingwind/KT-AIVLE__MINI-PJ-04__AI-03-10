function Button({ icon = '❇️', children, onClick }) {
  return (
    <button type="button" onClick={onClick}>
      {icon} {children}
    </button>
  );
}

export default Button;

//사용법
/*const 실행함수명 = () => {실행코드}
<Button onClick="{실행함수명}"/>
<Button icon = "❤️" onClick="{실행함수명}"/> => 버튼 아이콘 바꾸고 싶을때*/

//<Button onClick="{실행함수명}">children</Button> ex) or <Button onClick="{실행함수명}">추가</Button>