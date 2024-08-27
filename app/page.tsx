import { addAppIntroduction } from "./action/ActionAppIntroduction";
import { signUp } from "./action/ActionAuth";
import FormAuth from "./components/auth/FormAuth";
import FormAppIntroduction from "./components/dashboard/FormAppIntroduction";
import Button from "./components/ui/Button";
import InputImage from "./components/ui/InputImage";
import InputText from "./components/ui/InputText";
import Modal from "./components/ui/Modal";
import Textarea from "./components/ui/Textarea";
import NewAppIntroductions from "./components/webPage/sideMenu/NewAppIntroductions ";
import SideLink from "./components/webPage/sideMenu/SideLink";

export default function Home() {
  return (
    <main className="flex flex-col md:flex-row justify-between w-full max-w-[1140px] mx-auto">
      <div className="w-full max-w-[800px] px-2">
        <h2>main</h2>
        <InputText label="テスト" name="TEST" placeholder="テスト" />
        <Textarea label="テスト" name="TEST" placeholder="テスト" />
        <Button color="blue" size="small">
          登録
        </Button>
        <Button color="red" size="normal">
          削除
        </Button>
        <Button color="gray" size="normal">
          キャンセル
        </Button>
        <Modal buttonText="Test000" buttonColor="gray" buttonSize="normal" >
          <FormAppIntroduction
            formName="追加フォーム"
            formAction={addAppIntroduction}
          />
        </Modal>
        <Modal buttonText="登録" buttonColor="blue" buttonSize="small" >
          <FormAuth
            formAction={signUp}
          />
        </Modal>
        <NewAppIntroductions />
        <SideLink />
        <InputImage name={"a"} placeholder={"a"} />
      </div>
      <div className="w-full max-w-[300px] px-2">side</div>
    </main>
  );
}
