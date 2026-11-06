package se.kvallsshowen.tv;
import android.app.Activity;import android.os.Bundle;import android.view.KeyEvent;import android.view.View;import android.view.WindowManager;import android.webkit.WebChromeClient;import android.webkit.WebResourceError;import android.webkit.WebResourceRequest;import android.webkit.WebSettings;import android.webkit.WebView;import android.webkit.WebViewClient;
/** Öppnar Kvällsshowen i helskärm. Allt innehåll kommer från webbplatsen, så appen behöver aldrig uppdateras för nya spel. */
public class MainActivity extends Activity{
  static final String URL="https://kvallsshowen.vercel.app/tv";WebView w;
  @Override protected void onCreate(Bundle b){super.onCreate(b);getWindow().addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);w=new WebView(this);setContentView(w);hide();
    WebSettings s=w.getSettings();s.setJavaScriptEnabled(true);s.setDomStorageEnabled(true);s.setMediaPlaybackRequiresUserGesture(false);s.setUserAgentString(s.getUserAgentString()+" KvallsshowenTV");
    w.setBackgroundColor(0xFF16081F);w.setWebChromeClient(new WebChromeClient());
    w.setWebViewClient(new WebViewClient(){@Override public void onReceivedError(WebView v,WebResourceRequest r,WebResourceError e){if(r.isForMainFrame())v.postDelayed(()->v.loadUrl(URL),4000);}});
    if(b==null)w.loadUrl(URL);else w.restoreState(b);}
  void hide(){getWindow().getDecorView().setSystemUiVisibility(View.SYSTEM_UI_FLAG_FULLSCREEN|View.SYSTEM_UI_FLAG_HIDE_NAVIGATION|View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY);}
  @Override public void onWindowFocusChanged(boolean f){super.onWindowFocusChanged(f);if(f)hide();}
  @Override protected void onSaveInstanceState(Bundle o){super.onSaveInstanceState(o);w.saveState(o);}
  @Override protected void onPause(){super.onPause();w.onPause();}
  @Override protected void onResume(){super.onResume();w.onResume();}
  @Override public boolean onKeyDown(int k,KeyEvent e){if(k==KeyEvent.KEYCODE_BACK&&w.canGoBack()){w.goBack();return true;}return super.onKeyDown(k,e);}
}
