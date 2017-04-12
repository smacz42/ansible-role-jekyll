# Ansible Role: `jekyll`

## Description

Tasks to set up my personal blog.

Originally forked from [Jekyll-Uno](https://github.com/joshgerdes/jekyll-uno) by Josh Gerdes. Since then, there have been _many_ changes, however, the significant ones are:

* Better metadata support
    * Tags
    * Date
    * Images
    * Description
* Dark theme
* Custom background
* All javascript is self-contained
* Pages for tags:
    * Category
    * Program
    * Process

## Requirements

* RHEL only

## Role Variables

```yaml
variable: value # comment
```

## Tags

### Role-Specific tags:

* `jekyll`
* `jekyll_install`
* `jekyll_config`

### Global tags:

* `install`
* `config`

## Dependencies

* `smacz42.common`
* `smacz42.iptables`
* `smacz42.httpd`

## Example Playbook

```yaml
- name: Roles in Common
  hosts: all
  gather_facts: true
  remote_user: root

  roles:
    - { role: common }
    - { role: iptables }
    - { role: httpd }
    - { role: jekyll }
```

## TODO:

* Clean up click-and-drag highlighting colors
* Change button colors to uniform

## License

MIT / BSD

## Author Information

This role was created in 2017 by [Andrew Cz](https://andrewcz.com), a student at The Ohio State University.
