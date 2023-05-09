# Documentation

Demo: [https://puppy-net-demo.vercel.app/](https://puppy-net-demo.vercel.app/)
Registry Address: 0xa3e95A1a797711b779d3B70aA4B8380d6b1cf5BF

## Introduction

    SNS is simplified version of ENS, created to run on the new Shibarium network.
    The core idea is to match addresses to human readable names, referred as “domains”.
    Every domain stores additional ( trivial ) data such as “avatar”, “email”, “description” and so on.

![Untitled]("./src/assets/Docs/1.png")

    On top of that, a domain can issue subdomains. This is specially useful when a domain refers to a
    project where you have multiple wallets related to, like, for example, marketing, development or
    donations wallet. Those wallets can be easily found by following the structure subdomain.domain.tld
    ( e.g marketing.chainlink.eth ). This leads to a very organized nested system of human readable names.

## How it works

    The structure consists of 2 contracts: Registry and Registrar ( inspired by ENS ). Registry being the
    factory where you can buy and transfer domains and Registrar being the domain contract itself. Once a
    wallet owns a domain it can now set or modify the user data attached it ( description, website, email…)
    and issue as many subdomains as it wants. Subdomains will also have user data attached to it, data that
    can be modified by either the domain owner or subdomain owner.

![Untitled]("./src/assets/Docs/2.png")

     Since a single address can hold more than one domain, but never more than one subdomain ( more on that later ),
     we added the “primary domain” property. It refers to the default name the address should resolve and be
     resolve to. The first address an account buys or receives will be automatically set to primary, in the
     same token if an account sends its primary domain it will reset to empty, and stay empty until the user manually changes.

### Subdomains

     Subdomains are like branches inside domains, they act like very specific parts of a project, indexing
     important information in a simple manner following the structure “subdomain.domain.tld”. We opted for
     making subdomains a single unit per address, since they are very specific, although an address can
     hold multiple subdomains across different domains.

     Owners of a subdomain have the liberty to change its information by going to the domain page and
     opening the card referred to their subdomain. A more user friendly approach to it is being planned
     at the moment, such as a “my subdomains” tab, for better UX.

## Resolvers and library integration

     Resolvers are used to return and unknown information, given part of it. Such as getting a
     domain name via address or vice versa. Its extremely important to resolve data both ways for
     a fully human readable system to work, the way we did it in on SNS is as follows:

### Address to name

     To get a domain given a specific address we created the “primaryDomain” property. This allows
     a more dynamic system, since your first domain is automatically set primary it makes it
     an “opt-out” approach.

![Untitled]("./src/assets/Docs/3.png")

### Name to address

     Resolving an address can scale to more information if you immediately resolve the name.
     We made it two different parts because not every situation requires a detailed response.
     In this case, using “Bob” to call resolveName( ) will return the owner of “Bob.inu” and
     also the resolver contract address that contains not only the owner specific
     data ( description, email, avatar… ) but also all the domains attached to it.

![Untitled]("./src/assets/Docs/4.png")

### Library

     A library to fetch this data in both ways would be necessary for third party integration. As it is right now, the only implementation is in the dApp itself, but such data base wouldn’t scale well enough to be usable with NodeJs, a tool like TheGraph would come way more in handy due to the amount of nested information.
