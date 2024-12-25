import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="py-12 gap-10 bg-slate-800">
      <div className="max-w-52xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
          <div>
            <h3 className="font-bold mb-4 text-white">Receive promos</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Get promos, special offers delivered to your inbox
            </p>
            <div className="flex gap-1 bg-[#ffffff] p-0 rounded-lg w-25">
              <Input
                placeholder="Email address"
                className="bg-transparent border-none w-full text-black placeholder-white"
              />
              <Button className="bg-[#19bb39c7] text-white px-6 py-2">
                Register
              </Button>
            </div>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-white">LEGAL NOTICES</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-white">Who are we?</li>
              <li className="hover:text-white">What is ViaProxy?</li>
              <li className="hover:text-white">Our social values</li>
              <li className="hover:text-white">Data protection</li>
              <li className="hover:text-white">General conditions</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-white">PARTNER SPACES</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-white">Become a service provider</li>
              <li className="hover:text-white">Become a local merchant</li>
              <li className="hover:text-white">Become a local contributor</li>
              <li className="hover:text-white">Create your local agency</li>
              <li className="hover:text-white">Become a promoter</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-white">SPECIAL SERVICES</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-white">Assistance to people</li>
              <li className="hover:text-white">Services & Houses</li>
              <li className="hover:text-white">Services & Gardens</li>
              <li className="hover:text-white">Shop promotions</li>
              <li className="hover:text-white">Horeca promotions</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4 text-white">BUSINESS SERVICES</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="hover:text-white">Concierge services</li>
              <li className="hover:text-white">Works & Repairs</li>
              <li className="hover:text-white">Finding talent</li>
              <li className="hover:text-white">Find jobbers</li>
              <li className="hover:text-white">Promote your products</li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© 2024 VIAPROXY. Designed By Faseya</p>
        </div>
      </div>
    </footer>
  );
}
