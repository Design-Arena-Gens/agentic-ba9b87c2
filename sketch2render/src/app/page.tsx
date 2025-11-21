import Link from "next/link";
import { CodeBlock } from "@/components/CodeBlock";
import { GridCard } from "@/components/GridCard";
import { Section } from "@/components/Section";

export default function Home() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.16),_transparent_45%),linear-gradient(180deg,_#f8fafc,_#ffffff_45%,_#f5f3ff)] pb-24 text-zinc-900 dark:bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.12),_transparent_45%),linear-gradient(180deg,_#050914,_#111113_55%,_#020202)] dark:text-zinc-100">
      <header className="mx-auto w-full max-w-6xl px-6 pt-20 sm:px-10">
        <div className="flex flex-col gap-10 rounded-3xl border border-white/40 bg-white/60 p-10 shadow-[0_30px_90px_rgba(15,23,42,0.12)] backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/60 dark:shadow-[0_30px_90px_rgba(0,0,0,0.4)] sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-5">
            <p className="text-sm font-semibold uppercase tracking-[0.4em] text-emerald-500">
              Sketch2Render
            </p>
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl">
              Hyperrealistic image-to-image blueprint for natural light
            </h1>
            <p className="max-w-2xl text-lg leading-7 text-zinc-600 dark:text-zinc-300">
              This playbook distills the engineering, ML, and UX decisions
              required to convert hand-drawn sketches into photorealistic
              renders. It highlights the production pipeline, model choices, and
              design heuristics needed to deliver believable light and shadow
              behavior consistent with the source sketch.
            </p>
            <div className="flex flex-wrap gap-3 text-sm text-zinc-500 dark:text-zinc-400">
              <span className="rounded-full border border-emerald-300/60 bg-emerald-50 px-3 py-1 font-medium text-emerald-600 dark:border-emerald-400/20 dark:bg-emerald-400/10 dark:text-emerald-300">
                GenAI pipeline
              </span>
              <span className="rounded-full border border-indigo-300/60 bg-indigo-50 px-3 py-1 font-medium text-indigo-600 dark:border-indigo-400/20 dark:bg-indigo-400/10 dark:text-indigo-200">
                Lighting fidelity
              </span>
              <span className="rounded-full border border-zinc-300/60 bg-zinc-50 px-3 py-1 font-medium text-zinc-600 dark:border-zinc-600/30 dark:bg-zinc-800/50 dark:text-zinc-200">
                Production-ready UX
              </span>
            </div>
          </div>
          <dl className="grid grid-cols-2 gap-5 text-xs uppercase tracking-[0.25em] text-zinc-500 dark:text-zinc-400 sm:w-1/3">
            <div>
              <dt className="text-[0.7rem] leading-tight">Render latency</dt>
              <dd className="text-2xl font-semibold tracking-normal text-zinc-900 dark:text-zinc-100">
                &lt; 8s
              </dd>
            </div>
            <div>
              <dt className="text-[0.7rem] leading-tight">
                Lighting realism csat
              </dt>
              <dd className="text-2xl font-semibold tracking-normal text-zinc-900 dark:text-zinc-100">
                92%
              </dd>
            </div>
            <div>
              <dt className="text-[0.7rem] leading-tight">
                Fractional GPU cost / render
              </dt>
              <dd className="text-2xl font-semibold tracking-normal text-zinc-900 dark:text-zinc-100">
                $0.12
              </dd>
            </div>
            <div>
              <dt className="text-[0.7rem] leading-tight">Pipeline uptime</dt>
              <dd className="text-2xl font-semibold tracking-normal text-zinc-900 dark:text-zinc-100">
                99.5%
              </dd>
            </div>
          </dl>
        </div>
      </header>

      <main className="mx-auto mt-16 grid w-full max-w-6xl gap-10 px-6 pb-16 sm:px-10">
        <Section
          id="pipeline"
          eyebrow="System overview"
          title="End-to-end architecture at a glance"
          description="Orchestrate Sketch2Render as a streaming pipeline. The frontend collects intent, the orchestrator manages GPU workloads, and the lighting equalizer keeps photometric properties logically consistent with the sketch."
        >
          <div className="grid gap-6 lg:grid-cols-3">
            <GridCard title="Client capture & UX" eyebrow="Stage 01">
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  Use a canvas uploader (e.g.{" "}
                  <Link
                    href="https://github.com/excalidraw/excalidraw"
                    className="font-medium text-emerald-600 hover:text-emerald-500 dark:text-emerald-300 dark:hover:text-emerald-200"
                  >
                    Excalidraw
                  </Link>{" "}
                  or Fabric.js) to accept raster/vector sketches and capture
                  lighting intent tags (time of day, key light position).
                </li>
                <li>
                  Run on-device preprocessing to normalize background, remove
                  scanner noise, and estimate dominant edge directions using{" "}
                  <code>cv.Canny</code>.
                </li>
              </ul>
            </GridCard>
            <GridCard title="Generation core" eyebrow="Stage 02">
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  Tokenize the sketch with a lightweight ViT encoder aligned to
                  a Stable Diffusion XL control network for sketch guidance.
                </li>
                <li>
                  Apply LoRA adapters fine-tuned on realistic interior/exterior
                  datasets. Use a{" "}
                  <span className="font-medium text-zinc-800 dark:text-zinc-200">
                    0.65
                  </span>{" "}
                  guidance scale to balance fidelity vs. creativity.
                </li>
              </ul>
            </GridCard>
            <GridCard title="Post-process & QA" eyebrow="Stage 03">
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  Run relighting with Intel Open Image Denoise + custom HSV
                  curves to preserve shadow softness.
                </li>
                <li>
                  Score physical plausibility via a lighting critic trained with
                  HDR ground truth. Reject renders under a 0.82 score.
                </li>
                <li>
                  Stream progressive previews back to the client via WebSockets.
                </li>
              </ul>
            </GridCard>
          </div>
        </Section>

        <Section
          id="algorithms"
          eyebrow="Core algorithms"
          title="Key modules for sketch-conditioned diffusion"
          description="Blend deterministic edge preservation with learned global lighting priors. The following modules balance accuracy, speed, and controllability."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <GridCard title="Preprocessing & semantic lift">
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <code>adaptive_hist_equalization</code> on the luminance
                  channel to expand dynamic range without blowing highlights.
                </li>
                <li>
                  Skeletonize the sketch with Zhang-Suen to build a constraint
                  map for edge-preserving guidance.
                </li>
                <li>
                  Segment major planes using a Hough-based normal estimator to
                  feed the lighting advisor.
                </li>
              </ul>
            </GridCard>
            <GridCard title="Diffusion orchestration">
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  Use a two-stage sampler: DPM++ SDE Karras for coarse draft,
                  then DDIM w/ 20 steps for refinement.
                </li>
                <li>
                  Inject a learned light vector via ControlNet (normal map) +
                  IP-Adapter to preserve composition while adjusting intensity.
                </li>
                <li>
                  Cache VAE encoder states for iterative user edits to cut
                  latency on reruns by 40%.
                </li>
              </ul>
            </GridCard>
          </div>
          <CodeBlock language="python">
{`class Sketch2RenderPipeline:
    def __init__(self, base_model, controlnet, lighting_lora):
        self.base = base_model.half().to("cuda")
        self.controlnet = controlnet.to("cuda")
        self.lighting = lighting_lora

    @torch.inference_mode()
    def __call__(self, sketch, metadata):
        sketch_edges = preprocess(sketch, metadata)
        latent = self.base.encode(sketch_edges)

        conditioning = build_conditioning(
            prompt=metadata.prompt,
            light_vector=estimate_light_vector(sketch, metadata.tags),
            control_map=sketch_edges.control,
        )

        latent = diffuse_with_guidance(
            latent,
            conditioning,
            sampler="dpmpp_sde",
            steps=30,
            guidance_scale=0.65,
            lora_weights=self.lighting,
        )

        relit = relight(latent, method="hdrnet")
        return denoise_and_decode(relit)`}
          </CodeBlock>
        </Section>

        <Section
          id="lighting"
          eyebrow="Lighting heuristics"
          title="Guidelines for natural light and shadow behavior"
          description="Encode lighting intent and ensure downstream modules maintain coherence between shadows, reflections, and the sketch’s implied geometry."
        >
          <div className="grid gap-6 lg:grid-cols-3">
            <GridCard title="Capture intent">
              <ul className="list-disc space-y-2 pl-5">
                <li>Tag light source azimuth/elevation via radial slider UI.</li>
                <li>
                  Predict indoor/outdoor context with a small CLIP classifier to
                  choose the correct HDR environment map.
                </li>
                <li>
                  Encourage users to highlight reflective materials so the
                  renderer adjusts roughness automatically.
                </li>
              </ul>
            </GridCard>
            <GridCard title="Physical correctness">
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  Enforce shadow softness proportional to light source size with
                  a learned kernel width prior.
                </li>
                <li>
                  Regularize global illumination using a shallow NeRF trained on
                  the generated depth map for secondary bounce estimation.
                </li>
                <li>
                  Validate that luminance histograms follow a log-normal
                  distribution to avoid crushed blacks.
                </li>
              </ul>
            </GridCard>
            <GridCard title="Post-processing">
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  Run a tone-mapping curve (Reinhard) with a localized burn to
                  keep windows believable.
                </li>
                <li>
                  Composite volumetric light streaks via depth-aware bilateral
                  filtering for cinematic scenes.
                </li>
                <li>
                  Apply screen-space ambient occlusion on edge maps for extra
                  contact shadows.
                </li>
              </ul>
            </GridCard>
          </div>
        </Section>

        <Section
          id="stack"
          eyebrow="Tooling"
          title="Reference stack and deployment targets"
          description="Align GPU workloads with serverless ergonomics. Leverage managed inference endpoints for spikes while keeping deterministic preprocessing close to the edge."
        >
          <div className="overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800">
            <table className="min-w-full divide-y divide-zinc-100 text-sm dark:divide-zinc-800">
              <thead className="bg-zinc-50/80 text-left uppercase tracking-[0.25em] text-zinc-500 dark:bg-zinc-900/60 dark:text-zinc-400">
                <tr>
                  <th className="px-6 py-3">Layer</th>
                  <th className="px-6 py-3">Tech choice</th>
                  <th className="px-6 py-3">Notes</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100/80 dark:divide-zinc-800">
                <tr className="bg-white/80 dark:bg-zinc-900/70">
                  <td className="px-6 py-4 font-medium">Frontend</td>
                  <td className="px-6 py-4">
                    Next.js App Router, React Server Components, Tailwind CSS
                  </td>
                  <td className="px-6 py-4">
                    Streaming updates via Server Actions →{" "}
                    <code>EventSource</code> consumer.
                  </td>
                </tr>
                <tr className="bg-white/60 dark:bg-zinc-900/50">
                  <td className="px-6 py-4 font-medium">Edge preprocessing</td>
                  <td className="px-6 py-4">Cloudflare Workers + WASM OpenCV</td>
                  <td className="px-6 py-4">
                    Low latency denoising + sketch normalization close to users.
                  </td>
                </tr>
                <tr className="bg-white/80 dark:bg-zinc-900/70">
                  <td className="px-6 py-4 font-medium">Inference</td>
                  <td className="px-6 py-4">
                    Modal / Replicate GPU runtime, Triton servers, Automatic1111
                    API compatibility
                  </td>
                  <td className="px-6 py-4">
                    Horizontal scale with autoscaling GPU pools (A100 40GB or
                    L40S).
                  </td>
                </tr>
                <tr className="bg-white/60 dark:bg-zinc-900/50">
                  <td className="px-6 py-4 font-medium">Model registry</td>
                  <td className="px-6 py-4">
                    Weights &amp; Biases Artifacts + BentoML for versioned
                    runtime packs
                  </td>
                  <td className="px-6 py-4">
                    Capture LoRA + ControlNet pairing metadata for reproducible
                    renders.
                  </td>
                </tr>
                <tr className="bg-white/80 dark:bg-zinc-900/70">
                  <td className="px-6 py-4 font-medium">Storage</td>
                  <td className="px-6 py-4">Supabase buckets + Postgres JSONB</td>
                  <td className="px-6 py-4">
                    Persist prompts, lighting tags, and render audit data for
                    analytics.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Section>

        <Section
          id="guidance"
          eyebrow="Implementation notes"
          title="Operational guidance and experimentation cadence"
          description="Balance performance and iteration velocity with asynchronous job orchestration, progressive UX feedback, and quantitative QA."
        >
          <div className="grid gap-6 lg:grid-cols-2">
            <GridCard title="Service design">
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  Queue GPU jobs via Redis Streams; expose a control-plane API
                  for prioritizing pro users.
                </li>
                <li>
                  Emit trace spans (OpenTelemetry) per diffusion step to
                  analyze bottlenecks in Sampler vs. LoRA merges.
                </li>
                <li>
                  Store intermediate latents in S3 with a 24h TTL for quick
                  rollbacks.
                </li>
              </ul>
            </GridCard>
            <GridCard title="Experimentation">
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  Use guardrails tuned on LPIPS, SSIM, and a custom light-consent
                  metric to auto-promote variants.
                </li>
                <li>
                  Run nightly sweeps on LoRA rank (8, 16, 32) against inference
                  cost to maintain &lt;10% latency regression.
                </li>
                <li>
                  Collect UX telemetry on re-render frequency to adjust default
                  lighting presets.
                </li>
              </ul>
            </GridCard>
          </div>
          <CodeBlock language="typescript">
{`import { NextRequest } from "next/server";
import { z } from "zod";
import { enqueueJob } from "@/lib/queue";
import { extractLightingTags } from "@/lib/lighting";

const payloadSchema = z.object({
  sketchUrl: z.string().url(),
  prompt: z.string().min(10),
  intent: z.object({
    keyLight: z.tuple([z.number(), z.number()]), // [azimuth, elevation]
    mood: z.enum(["morning", "noon", "golden_hour", "night"]),
  }),
});

export async function POST(req: NextRequest) {
  const body = await req.json();
  const payload = payloadSchema.parse(body);

  const lightingVector = await extractLightingTags(payload.sketchUrl, payload.intent);

  await enqueueJob({
    type: "render",
    payload: {
      ...payload,
      lightingVector,
    },
    priority: payload.intent.mood === "night" ? "high" : "normal",
  });

  return new Response(JSON.stringify({ status: "queued" }), {
    status: 202,
  });
}`}
          </CodeBlock>
        </Section>

        <Section
          id="ux"
          eyebrow="Experience design"
          title="UX patterns that build trust in generated renders"
          description="Leverage progressive disclosure, tactile feedback, and transparency around model decisions to drive adoption across design and product teams."
        >
          <div className="grid gap-6 lg:grid-cols-3">
            <GridCard title="Sketch clarity tools">
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  Offer line-weight normalization preview so users can fix
                  inconsistent strokes pre-inference.
                </li>
                <li>
                  Suggest intent tags (materials, lighting) using GPT-4o mini for
                  rapid onboarding.
                </li>
              </ul>
            </GridCard>
            <GridCard title="Transparent rendering">
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  Show diffusion progress with keyframes (step 1, 10, 20) and
                  annotate lighting adjustments applied.
                </li>
                <li>
                  Allow users to lock lighting while iterating on materials to
                  reduce variance between runs.
                </li>
              </ul>
            </GridCard>
            <GridCard title="Review & collaboration">
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  Provide side-by-side diff viewer with swipe comparisons and
                  heatmaps for change detection.
                </li>
                <li>
                  Export lighting presets as shareable tokens consumable by
                  external DCC tools (Blender, Unreal).
                </li>
              </ul>
            </GridCard>
          </div>
        </Section>

        <Section
          id="metrics"
          eyebrow="Success metrics"
          title="How to measure realism and product value"
          description="Track model quality, operational efficiency, and customer outcomes. Instrument analytics from day one to ground roadmap debates."
        >
          <div className="grid gap-6 lg:grid-cols-3">
            <GridCard title="Visual quality">
              <ul className="list-disc space-y-2 pl-5">
                <li>LPIPS vs. baseline renders &lt; 0.21 (lower is better).</li>
                <li>Shadow continuity rating ≥ 4.3 / 5 in panel review.</li>
                <li>Automatic invalidation when lighting critic &lt; 0.82.</li>
              </ul>
            </GridCard>
            <GridCard title="Operational">
              <ul className="list-disc space-y-2 pl-5">
                <li>P95 render latency &lt; 12s across global regions.</li>
                <li>GPU utilization between 60–80% to avoid saturation.</li>
                <li>Cache hit rate on rerenders ≥ 65%.</li>
              </ul>
            </GridCard>
            <GridCard title="Product adoption">
              <ul className="list-disc space-y-2 pl-5">
                <li>Weekly active designers / paying seats ratio &gt; 0.55.</li>
                <li>Retention uplift when hyperreal mode enabled +15%.</li>
                <li>NPS delta after lighting roadmap releases.</li>
              </ul>
            </GridCard>
          </div>
        </Section>
      </main>

      <footer className="mx-auto w-full max-w-6xl px-6 pb-10 pt-6 text-sm text-zinc-500 dark:text-zinc-400 sm:px-10">
        <div className="flex flex-col items-start justify-between gap-4 rounded-3xl border border-white/40 bg-white/60 p-6 backdrop-blur-xl dark:border-white/10 dark:bg-zinc-900/50 sm:flex-row sm:items-center">
          <div>
            <p className="font-semibold uppercase tracking-[0.35em] text-emerald-500">
              Next steps
            </p>
            <p className="text-zinc-600 dark:text-zinc-300">
              Wire up the orchestrator, seed the LoRA bank, and invite power
              users to validate lighting presets.
            </p>
          </div>
          <Link
            href="#pipeline"
            className="inline-flex items-center gap-2 rounded-full border border-emerald-500 bg-emerald-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-emerald-400"
          >
            Review architecture
          </Link>
        </div>
      </footer>
    </div>
  );
}
