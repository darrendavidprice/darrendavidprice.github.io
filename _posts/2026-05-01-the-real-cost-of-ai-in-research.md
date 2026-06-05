---
title: "The real cost of AI in research"
subtitle: "What we get wrong when we treat machine learning as a cheap shortcut to scientific discovery."
date: 2026-05-01
tags: [higher-education, research-policy, ai, skills]
---

Universities are awash with talk of artificial intelligence — most of it
optimistic, some of it cautious, and almost none of it costed properly. Funding
calls invite us to "harness AI for discovery"; strategies promise to weave it
through every discipline; vice-chancellors arrive at all-hands meetings with a
slide showing exponential curves and a request for ideas. The trouble is that
the conversation we are having about AI in research is mostly a conversation
about *output* — what AI will let us do — and not about *input*, which is
where the real costs and the real tradeoffs sit.

I work in experimental particle physics, in a community that has been doing
machine learning at scale for over a decade. The honest summary of our
experience is this: machine learning has been transformative, and it has been
expensive in ways that nobody anticipated when we started.

## The visible costs

Begin with the obvious. Training a useful model takes compute, and good compute
costs money. The headline budgets quoted by industry — millions of dollars
for a single training run — are not yet the typical cost in academic research,
but they are the ceiling we are now negotiating with. Even the modest models
that do real work in physics analyses now consume meaningful fractions of our
computing grants.

> If you cannot say where the next person to maintain this model will come
> from, you have not finished designing the project.

Then there is data. The dirty secret of nearly every successful ML application
in science is that the data work — labelling, cleaning, validating, formatting,
documenting — is more expensive than the modelling work. By a long way. A
research group that invests in a thoughtful data pipeline can get serviceable
ML out of modest infrastructure; a group that buys a GPU cluster but skimps on
data engineering will get spectacular-looking models that do not generalise.

## The invisible costs

The costs that catch us out, though, are the ones that do not appear on any
balance sheet.

{% include pullquote.html text="Machine learning is not a cheap shortcut to scientific discovery. It is a different and frequently more demanding way of doing the same hard work." %}

The first is **methodological literacy**. Using an ML model honestly — knowing
when it is overconfident, where it fails, how to estimate its systematic
uncertainties — requires a kind of statistical sophistication that most
researchers (myself included) had to learn the long way. A field that adopts ML
faster than it builds this literacy is a field that publishes confidently wrong
results.

The second is **scientific identity**. There is a temptation, when a model
does the heavy lifting, to let the researcher's understanding of the underlying
physics atrophy. A PhD student who fine-tunes a transformer to classify their
data has done a real piece of work, but if they cannot explain *what the
transformer learned*, they have not yet done science. The same is true of the
professor who supervises them.

The third — and this is the one universities most underestimate — is
**maintainability**. Models drift. Frameworks deprecate. Dependencies break.
The half-life of a piece of working ML code, in our experience, is closer to
two years than to ten. If you cannot say where the next person to maintain
this model will come from, you have not finished designing the project.

## What this means for policy

None of this is an argument against AI in research. The argument is that we
should plan for its real costs rather than its imagined ones — and that means
investing in three boring, durable things:

1. **Training in statistical and computational methods** for researchers, at
   every career stage, not just at the PhD induction stage. This is the single
   highest-leverage investment a department can make.
2. **Data engineering as a research discipline**, with proper recognition for
   the people who do it. Without this, the rest of the AI strategy is theatre.
3. **Long horizons for software**, with funding instruments that pay for the
   five-year maintenance window, not just the three-year build.

The exponential curves are real. So are the costs. Universities that treat AI
as a cheap shortcut will, in the medium term, spend more and learn less than
those that treat it as a serious craft.

_This is the first piece in an occasional series on research policy and the
practical realities of doing data-intensive science in modern universities._
